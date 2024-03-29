from rest_framework import serializers
from .models import basket
from .models import strategy, strategyCondition
from .models import leg, legCondition
from .models import user
from .models import userBrokerMapping
from .models import strategyMarketPlace
from .models import subscriptionPayment

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('__all__')

class userGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('userId', 'userName', 'userContactNumber', 'userEmail')
        
class basketSerializer(serializers.ModelSerializer):
    class Meta:
        model = basket
        fields = ('__all__')

class legSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = leg
        fields = ('__all__')

class legConditionSerializer(serializers.ModelSerializer):

    class Meta:
        model = legCondition
        fields = ('__all__')
        
class strategySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = strategy
        fields = ('__all__')

class strategyConditionSerializer(serializers.ModelSerializer):

    class Meta:
        model = strategyCondition
        fields = ('__all__')
        
class userBrokerMappingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = userBrokerMapping
        fields = ('__all__')
        
class strategyMarketPlaceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = strategyMarketPlace
        fields = ('__all__')

class subscriptionPaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = subscriptionPayment
        fields = ('__all__')
