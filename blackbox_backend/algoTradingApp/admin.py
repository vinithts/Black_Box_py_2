from django.contrib import admin

from django.apps import apps
from .models import user, basket, strategy, strategyCondition, leg, legCondition, userBrokerMapping, strategyMarketPlace, subscriptionPayment

class userAdmin(admin.ModelAdmin):
    list_display = ("userId", "userName", "userContactNumber", "userPassword", "userEmail", "createdAt", "updatedAt")
admin.site.register(user, userAdmin)

class basketAdmin(admin.ModelAdmin):
    list_display = ("basketId", "basketName", "deployed", "shared", "createdAt", "updatedAt")
admin.site.register(basket, basketAdmin)

class strategyAdmin(admin.ModelAdmin):
    list_display = ("strategyId", "basketId", "strategyName", "strategyShortDescription", "strategyLongDescription", "index", "segment", "orderType", "createdAt", "updatedAt")
admin.site.register(strategy, strategyAdmin)

class strategyConditionAdmin(admin.ModelAdmin):
    list_display = ("strategyConditionId", "strategyId", "type", "conditionType", "configuration", "strategyType", "createdAt", "updatedAt")
admin.site.register(strategyCondition, strategyConditionAdmin)

class legAdmin(admin.ModelAdmin):
    list_display = ('legId', "strategyId", "legOrderType", "tradeType", "expiryDate", "legCondition", "strikePrice", "totalLots", 'createdAt', 'updatedAt')
admin.site.register(leg, legAdmin)

class legConditionAdmin(admin.ModelAdmin):
    list_display = ("legConditionId", "legId", "legType", "legConditionType", "legConfiguration", "createdAt", "updatedAt")
admin.site.register(legCondition, legConditionAdmin)

class userBrokerMappingAdmin(admin.ModelAdmin):
    list_display = ('userBrokerMappingId', 'userId', 'brokerName', 'exchange', 'brokerUserName', 'brokerPassword', 'appKey', 'secreteKey', 'secreteToken', 'totpToken', 'createdAt', 'updatedAt')
admin.site.register(userBrokerMapping, userBrokerMappingAdmin)

class strategyMarketPlaceAdmin(admin.ModelAdmin):
    list_display = ('strategyMarketPlaceId', 'userId', 'strategyCreaterName', 'basketId', 'basketName', 'exchange', 'capitalRequired', 'drawDownPercent', 'returnOfInvestmentPercent', 'subscriptionFee', 'subscriptionType', 'numberOfUsersSubscribed', 'active', 'createdAt', 'updatedAt')
admin.site.register(strategyMarketPlace, strategyMarketPlaceAdmin)

class subscriptionPaymentAdmin(admin.ModelAdmin):
    list_display = ('subscriptionPaymentId', 'userId', 'basketId', 'basketName', 'subscriptionFee', 'paymentStatus', 'paymentId', 'rejectionReason', 'paymentPayloadDump', 'createdAt', 'updatedAt')
admin.site.register(subscriptionPayment, subscriptionPaymentAdmin)

'''models = apps.get_models()
for model in models:
    try:
        admin.site.register(model, displayAdmin)
    except admin.sites.AlreadyRegistered:
        pass'''
