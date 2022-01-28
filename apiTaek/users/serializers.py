from dataclasses import fields
import imp
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'phone']
          #ici, on va rendre le champs password indisponible et pas visible après son insertion
        extra_kwargs = {
            'password': {'write_only': True} # Le mot de passe sera sera visible en mode écriture mais pas en mode lecture
        }
    
    def create(self, validated_data): #function pour hacher le mot de passe
        password = validated_data.pop('password', None) #pour recuperer le mot de passe 
        instance = self.Meta.model(**validated_data)  #on recupère une instance du mot de passe passé dans le serializer

        if password is not None : 
            instance.set_password(password) # on passe le passeword à l'instance qui se chargera de hacher le mot de passe
        instance.save()
        return instance
