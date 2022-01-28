from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response 
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt, datetime

# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView): #Pour recupérer l'email et le password et comparer si ca existe
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        # rechercher dans le model un user dont l'email = email et recuperer l'objet User de cet email
        user = User.objects.filter(email=email).first()

        if user is None :
            raise AuthenticationFailed("User not found")

        #now we compare the password
        if not user.check_password(password): #we use it to compare normal pass and hachCode pass. Django_style
            raise AuthenticationFailed("Incorrect password")

        #On des params pour le token pour l'authentification
        payload = {
            "id": user.id, #identifiant user
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60), #temps de validation du token
            "iat": datetime.datetime.utcnow() #moment de création du token
        }

        #On crée le token
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        #Le token doit etre disponible dans les cookies pour une meilleur
        #On crée l'objet de la response
        response = Response()

        #on insert la clé et la valeur du token qu'on a crée
        response.set_cookie(key='jwt', value=token, httponly=True) #httponly=True pour que le frontEnd n'accède pas à ce token

        #httponly=True, va juste offrir la possibilité au frontend d'avoir le token dans ses cookies, mais le frontend
        #Ne va pas acceder à ce token disponible dans le backend

        #Le token en question le voit ci dans le backend
        response.data = {
            "jwt": token
        }

        return response



#On defini la classe qui va get le user en fonction du cookie

class UserView(APIView):

    def get(self, request):

        #get the token
        token = request.COOKIES.get('jwt')

        #verification
        if not token:
            raise AuthenticationFailed('unAuthenticated')

        #decode the cokkies and get user id
        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('unAuthenticated')

        #get the user
        user = User.objects.filter(id=payload['id']).first()

        #we serialize the user
        serialize = UserSerializer(user)

        return Response(serialize.data)


class LogOutView(APIView):

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')

        response.data = {
            "message": "success"
        }

        return response