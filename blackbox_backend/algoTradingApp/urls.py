from django.urls import path
from . import views

from .views import basketAPI
from .views import strategyAPI
from .views import legAPI
from .views import strategyConditionAPI
from .views import legConditionAPI
from .views import userAPI
from .views import userBrokerMappingAPI
from .views import strategyMarketPlaceAPI
#from .views import subscriptionPaymnetApi

urlpatterns = [

    path('strategy/builder/create_basket/',basketAPI.as_view()),
    path('strategy/builder/edit_basket/<int:basketId>',basketAPI.as_view()),
    path('strategy/builder/delete_basket/<int:basketId>',basketAPI.as_view()),
    path('strategy/builder/get_baskets/<int:userId>',basketAPI.as_view()),
    
    path('strategy/builder/create_strategy_leg/',strategyAPI.as_view()),
    path('strategy/builder/get_strategy_leg_bId/<int:basketId>', strategyAPI.as_view()),
    path('strategy/builder/get_strategy_leg/<int:strategyId>',strategyAPI.as_view()),
    path('strategy/builder/edit_strategy_leg/<int:strategyId>',strategyAPI.as_view()),
    path('strategy/builder/delete_strategy_leg/<int:strategyId>',strategyAPI.as_view()),
    
    path('strategy/builder/delete_leg/<int:legId>',legAPI.as_view()),
    path('strategy/builder/create_leg/',legAPI.as_view()),
    #path('strategy/builder/edit_leg/<int:legId>',legAPI.as_view()),
    #path('strategy/builder/delete_leg/<int:legId>',legAPI.as_view()),
    #path('strategy/builder/get_legs/',legAPI.as_view()),
    #path('strategy/builder/get_leg/<int:legId>',legAPI.as_view()),

    path('strategy/builder/create_strategyConditions/', strategyConditionAPI.as_view()),
    path('strategy/builder/delete_strategyConditions/', strategyConditionAPI.as_view()),

    path('strategy/builder/create_legConditions/', legConditionAPI.as_view()),
    path('strategy/builder/delete_legConditions/', legConditionAPI.as_view()),

    
    path('strategy/builder/get_users/',userAPI.as_view()),
    path('strategy/builder/get_user/<int:userId>',userAPI.as_view()),
    path('strategy/builder/get_user_cno/<str:userContactNumber>',userAPI.as_view()),
    path('strategy/builder/create_user/',userAPI.as_view()),
    path('strategy/builder/edit_user/<int:userId>',userAPI.as_view()),
    path('strategy/builder/delete_user/<int:userId>',userAPI.as_view()),
    path('strategy/builder/login/<str:userContactNumber>/<str:userPassword>', userAPI.as_view()),
    
    path('strategy/builder/get_user_broker/<int:userId>/<str:brokerName>', userBrokerMappingAPI.as_view()),
    path('strategy/builder/get_user_broker_uId/<int:userId>', userBrokerMappingAPI.as_view()),
    path('strategy/builder/create_user_broker/', userBrokerMappingAPI.as_view()),
    path('strategy/builder/edit_user_broker/<int:userId>/<str:brokerName>', userBrokerMappingAPI.as_view()),
    path('strategy/builder/delete_user_broker/<int:userId>/<str:brokerName>', userBrokerMappingAPI.as_view()),
    
    path('strategy/builder/get_strategyMarketPlace/', strategyMarketPlaceAPI.as_view()),
    path('strategy/builder/create_strategyMarketPlace/', strategyMarketPlaceAPI.as_view()),
    path('strategy/builder/delete_StrategyMarketPlace/<int:strategyMarketPlaceId>',strategyMarketPlaceAPI.as_view()),    

    #path('strategy/builder/payment/', subscriptionPaymnetApi.as_view()),

]