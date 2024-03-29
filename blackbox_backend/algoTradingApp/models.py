from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from phonenumber_field.modelfields import PhoneNumberField
from datetime import time

indexChoice = [
    ('NIFTY', 'NIFTY'),
    ('BANKNIFTY', 'BANKNIFTY'),
    ('FINNIFTY', 'FINNIFTY'),
]

segmentChoice = [
    ('OPTIONS', 'OPTIONS'),
    ('FUTURES', 'FUTURES'),
    ('EQUITY', 'EQUITY')
]

orderTypeChoice = [
    ('MIS', 'MIS'),
    ('NRML', 'NRML'),
    ('CNC', 'CNC')
]

typeChoice = [
    ('ENTRY', 'ENTRY'),
    ('EXIT', 'EXIT')
]

"""conditionTypeChoice = [
    ('DAY_OF_WEEK', 'DAY_OF_WEEK'),
    ('PREDEFINED_ENTRY_DATE', 'PREDEFINED_ENTRY_DATE'),
    ('PREDEFINED_EXIT_DATE', 'PREDEFINED_EXIT_DATE'),
    ('ENTRY_TIME', 'ENTRY_TIME'),
    ('EXIT_TIME', 'EXIT_TIME'),
    ('STRATEGY_TARGET_PROFIT', 'STRATEGY_TARGET_PROFIT'),
    ('STRATEGY_STOP_LOSS', 'STRATEGY_STOP_LOSS')
]"""

strategyTypeChoice = [
    ('INTRADAY', 'INTRADAY'),
    ('POSITIONAL', 'POSITIONAL'),
    ('STBT/BTST', 'STBT/BTST')
]

legOrderTypeChoice = [
    ('CE', 'CE'),
    ('PE', 'PE'),
]

tradeTypeChoice = [
    ('BUY', 'BUY'),
    ('SELL', 'SELL')
]

legConditionChoice = [
    ('ATM_POINT', 'ATM_POINT'),
    ('ATM_PERCENT', 'ATM_PERCENT'),
    ('CLOSEST_PREMIUM', 'CLOSEST_PREMIUM')
]

legTypeChoice = [
    ('ENTRY', 'ENTRY'),
    ('EXIT', 'EXIT')
]

"""legConditionTypeChoice = [
    ('TARGET_PROFIT', 'TARGET_PROFIT'),
    ('STOP_LOSS', 'STOP_LOSS'),
    ('TRAIL_STOP_LOSS', 'TRAIL_STOP_LOSS')
]"""




brokerNameChoice = [
    ('IIFL', 'IIFL'),
    ('ECNO', 'ECNO'),
    ('ZERODHA', 'ZERODHA'),
    ('ALICEBLUE', 'ALICEBLUE'),
    ('JAINAM', 'JAINAM')
]

subscriptionTypeChoice = [
    ('FLAT_FEE', 'FLAT_FEE'),
    ('SHARING', 'SHARING')
]

orderStatusChoice = [
    ('SUCCESS', 'SUCCESS'),
    ('FAILED', 'FAILED')
]

intrumentTypeChoice = [
    ('BASE_INDEX', 'BASE_INDEX'),
    ('OPTION', 'OPTION')
]

typeChoice = [
    ('ENTRY', 'ENTRY'),
    ('EXIT', 'EXIT')
]

conditionTypeChoice = [
    ('TIME', 'TIME'),
    ('DAY_OF_WEEK', 'DAY_OF_WEEK'),
    ('INSTRUMENT_PRICE', 'INSTRUMENT_PRICE'),
    ('PROFIT_PERCENT', 'PROFIT_PERCENT')
]



def validateTime(value):
    if (value >= time(9, 15, 0)) and (value <= time(15, 29, 0)):
        return value
    else:
        raise ValidationError("Time should be greater than 9:15:00 and less than 15:29:00")


'''def validateContactNumber(value):
    if len(str(value))==10:
        return value
    else:
        raise ValidationError("Contact number should be of length 10.")'''


def validateEmail(value):
    try:
        validate_email(value)
    except ValidationError:
        raise ValidationError("Not a valid Email address")
    else:
        return value


class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False)
    objects = models.Manager()
    undeleted_objects = SoftDeleteManager()

    def soft_delete(self):
        self.is_deleted = True
        self.save()

    def restore(self):
        self.is_deleted = False
        self.save()

    class Meta:
        abstract = True


class user(SoftDeleteModel):
    userId = models.AutoField(primary_key=True)
    userName = models.CharField(max_length=25)
    userContactNumber = PhoneNumberField(null=False, blank=False, unique=True)
    userPassword = models.CharField(max_length=20)
    userEmail = models.CharField(max_length=40, validators=[validateEmail])
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s %s" % (
            self.userId, self.userName, self.userContactNumber, self.userPassword, self.userEmail, self.createdAt,
            self.updatedAt)


class basket(SoftDeleteModel):
    userId = models.ForeignKey(user, on_delete=models.CASCADE)
    basketId = models.AutoField(primary_key=True)
    basketName = models.CharField(max_length=25)
    deployed = models.BooleanField()
    shared = models.BooleanField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s" % (
            self.basketId, self.basketName, self.shared, self.deployed, self.createdAt, self.updatedAt)


class strategy(SoftDeleteModel):
    strategyId = models.AutoField(primary_key=True)
    basketId = models.ForeignKey(basket, on_delete=models.CASCADE)
    strategyName = models.CharField(max_length=25)
    strategyShortDescription = models.CharField(max_length=100)
    strategyLongDescription = models.CharField(max_length=200)
    index = models.CharField(max_length=20, choices=indexChoice)
    segment = models.CharField(max_length=20, choices=segmentChoice)
    orderType = models.CharField(max_length=5, choices = orderTypeChoice)
    #runOnDays = models.CharField(max_length=100)
    # expiryType = models.CharField(max_length=10, choices = expiryTypeChoices)
    #strategyTargetProfit = models.IntegerField()
    #strategyStopLoss = models.IntegerField()
    #strategyType = models.CharField(max_length=10, choices=strategyTypeChoice)
    #entryTime = models.TimeField(validators=[validateTime])
    #exitTime = models.TimeField(validators=[validateTime])
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s %s %s %s %s" % (
            self.strategyId, self.basketId, self.strategyName, self.strategyShortDescription, self.strategyLongDescription, self.index, self.segment, self.orderType, self.createdAt, self.updatedAt)


class strategyCondition(SoftDeleteModel):
    strategyConditionId = models.AutoField(primary_key=True)
    strategyId = models.ForeignKey(strategy, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=typeChoice)
    conditionType = models.CharField(max_length=50)#, choices=conditionTypeChoice)
    configuration = models.CharField(max_length=100)
    strategyType = models.CharField(max_length=10, choices=strategyTypeChoice)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s %s %s" % (self.strategyConditionId, self.strategyId, self.type, self.conditionType, self.configuration, self.strategyType, self.createdAt, self.updatedAt)


class leg(SoftDeleteModel):
    legId = models.AutoField(primary_key=True)
    strategyId = models.ForeignKey(strategy, on_delete=models.CASCADE)
    legOrderType = models.CharField(max_length=5, choices=legOrderTypeChoice)
    #optionType = models.CharField(max_length=5, choices=optionTypeChoice)
    #expiryType = models.CharField(max_length=10, choices=expiryTypeChoices)
    tradeType = models.CharField(max_length=5, choices=tradeTypeChoice)
    expiryDate = models.DateTimeField()
    legCondition = models.CharField(max_length=20, choices=legConditionChoice)
    strikePrice = models.CharField(max_length=20)
    #strategyCondition = models.CharField(max_length=15, choices=strategyConditionChoice)
    totalLots = models.IntegerField()
    #targetProfit = models.IntegerField()
    #stopLoss = models.IntegerField()
    #trailStopLoss = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s %s %s %s %s" % (
            self.legId, self.strategyId, self.legOrderType, self.tradeType, self.expiryDate, self.legCondition, self.strikePrice, self.totalLots, self.createdAt, self.updatedAt )


class legCondition(SoftDeleteModel):
    legConditionId = models.AutoField(primary_key=True)
    legId = models.ForeignKey(leg, on_delete=models.CASCADE)
    legType = models.CharField(max_length=20, choices=legTypeChoice)
    legConditionType = models.CharField(max_length=50) #, choices=legConditionTypeChoice)
    legConfiguration = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s %s" % (self.legConditionId, self.legId, self.legType, self.legConditionType, self.legConfiguration, self.createdAt, self.updatedAt)
    

class userBrokerMapping(SoftDeleteModel):
    userBrokerMappingId = models.AutoField(primary_key=True)
    userId = models.ForeignKey(user, on_delete=models.CASCADE)
    brokerName = models.CharField(max_length=20, choices=brokerNameChoice)
    exchange = models.CharField(max_length=20)
    brokerUserName = models.CharField(max_length=30)
    brokerPassword = models.CharField(max_length=30)
    appKey = models.CharField(max_length=100)
    secreteKey = models.CharField(max_length=100)
    secreteToken = models.CharField(max_length=100)
    totpToken = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s %s %s %s %s %s" % (
            self.userBrokerMappingId, self.brokerName, self.exchange, self.brokerUserName, self.brokerPassword,
            self.appKey,
            self.secreteKey, self.secreteToken, self.totpToken, self.createdAt, self.updatedAt)


class strategyMarketPlace(SoftDeleteModel):
    strategyMarketPlaceId = models.AutoField(primary_key=True)
    userId = models.ForeignKey(user, on_delete=models.CASCADE)
    strategyCreaterName = models.CharField(max_length=25)
    basketId = models.ForeignKey(basket, on_delete=models.CASCADE)
    basketName = models.CharField(max_length=25)
    exchange = models.CharField(max_length=20)
    capitalRequired = models.FloatField()
    drawDownPercent = models.FloatField()
    returnOfInvestmentPercent = models.FloatField()
    subscriptionFee = models.FloatField()
    subscriptionType = models.CharField(max_length=20, choices=subscriptionTypeChoice)
    numberOfUsersSubscribed = models.IntegerField()
    active = models.BooleanField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s %s %s %s %s %s %s" % (
            self.strategyMarketPlaceId, self.strategyCreaterName, self.basketName, self.exchange, self.capitalRequired,
            self.drawDownPercent, self.returnOfInvestmentPercent, self.subscriptionFee, self.subscriptionType,
            self.numberOfUsersSubscribed, self.createdAt, self.updatedAt)


class subscriptionPayment(SoftDeleteModel):
    subscriptionPaymentId = models.AutoField(primary_key=True)
    userId = models.ForeignKey(user, on_delete=models.CASCADE)
    basketId = models.ForeignKey(basket, on_delete=models.CASCADE)
    basketName = models.CharField(max_length=25)
    subscriptionFee = models.ForeignKey(strategyMarketPlace, on_delete=models.CASCADE)
    paymentStatus = models.BooleanField()
    paymentId = models.CharField(max_length=100)
    rejectionReason = models.CharField(max_length=100)
    paymentPayloadDump = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s %s %s %s %s %s %s %s %s %s %s" % (
            self.subscriptionPaymentId, self.userId, self.basketId, self.basketName, self.subscriptionFee,
            self.paymentStatus, self.paymentId, self.rejectionReason, self.paymentPayloadDump, self.createdAt,
            self.updatedAt)

    class orderStatus(SoftDeleteModel):
        orderStatusId = models.AutoField(primary_key=True)
        orderBatchId = models.CharField(max_length=100)
        legId = models.ForeignKey(leg, on_delete=models.CASCADE)
        orderSequenceNumber = models.IntegerField()
        orderResponse = models.TextField()
        orderStatus = models.CharField(max_length=10, choices=orderStatusChoice)
        # brokerId = models.ForeignKey(broker, on_delete=models.CASCADE)
        brokerOrderId = models.CharField(max_length=25)
        createdAt = models.DateTimeField(auto_now_add=True)
        updatedAt = models.DateTimeField(auto_now=True)

        def __str__(self):
            return "%s %s %s %s %s %s %s %s %s" % (
                self.orderStatusId, self.orderBatchId, self.legId, self.orderSequenceNumber, self.orderResponse,
                self.orderStatus, self.brokerOrderId, self.createdAt, self.updatedAt)

    class activeStrategyLegs(SoftDeleteModel):
        date = models.DateTimeField()
        strategyEntryId = models.CharField(max_length=50)
        strategyId = models.ForeignKey(strategy, on_delete=models.CASCADE)
        strategyLegId = models.ForeignKey(leg, on_delete=models.CASCADE)
        underlyingSymbol = models.CharField(max_length=20)
        #optionType = models.CharField(max_length=20, choices=optionTypeChoice)
        tradeType = models.CharField(max_length=20, choices=tradeTypeChoice)
        totalLots = models.IntegerField()
        expiryDate = models.DateTimeField()
        derivedAtmStrike = models.IntegerField()
        derivedExecutionStrike = models.IntegerField()
        tradeSymbol = models.CharField(max_length=50)
        exchangeSegment = models.CharField(max_length=50)
        createdAt = models.DateTimeField(auto_now_add=True)
        updatedAt = models.DateTimeField(auto_now=True)

        def __str__(self):
            return "%s %s %s %s %s %s %s %s %s %s %s %s %s %s %s" % (
                self.date, self.strategyEntryId, self.strategyId, self.strategyLegId, self.underlyingSymbol,
                self.optionType, self.tradeType, self.totalLots, self.expiryDate, self.derivedAtmStrike,
                self.derivedExecutionStrike, self.tradeSymbol, self.exchangeSegment, self.createdAt, self.updatedAt)

    class batchOrderLegs(SoftDeleteModel):
        orderBatchId = models.CharField(max_length=50)
        orderPayload = models.TextField()
        orderSentTime = models.DateTimeField()
        clientId = models.CharField(max_length=50)
        orderBatchStatus = models.CharField(max_length=25)
        strategyEntryId = models.CharField(max_length=50)
        createdAt = models.DateTimeField(auto_now_add=True)
        updatedAt = models.DateTimeField(auto_now=True)

        def __str__(self):
            return "%s %s %s %s %s %s %s %s" % (
                self.orderBatchId, self.orderPayload, self.orderSentTime, self.clientId, self.orderBatchStatus,
                self.strategyEntryId, self.createdAt, self.updatedAt)

    class strategyExecutions(SoftDeleteModel):
        orderBatchId = models.CharField(max_length=50)
        orderPayload = models.TextField()
        orderSentTime = models.DateTimeField()
        clientId = models.CharField(max_length=50)
        orderBatchStatus = models.CharField(max_length=25)
        strategyEntryId = models.CharField(max_length=50)
        createdAt = models.DateTimeField(auto_now_add=True)
        updatedAt = models.DateTimeField(auto_now=True)

        def __str__(self):
            return "%s %s %s %s %s %s %s %s" % (
                self.orderBatchId, self.orderPayload, self.orderSentTime, self.clientId, self.orderBatchStatus,
                self.strategyEntryId, self.createdAt, self.updatedAt)

    class instrument(SoftDeleteModel):
        instrumentId = models.AutoField(primary_key=True)
        instrumentType = models.CharField(max_length=20, choices=intrumentTypeChoice)
        symbol = models.CharField(max_length=100)
        name = models.CharField(max_length=100)
        description = models.TextField()
        exchange = models.CharField(max_length=100)
        exchangeSegment = models.IntegerField()
        series = models.CharField(max_length=20)
        exchangeInstrumentId = models.CharField(max_length=50)
        optionExpiryDate = models.DateField()
        #optionType = models.CharField(max_length=20, choices=optionTypeChoice)
        optionStrikePrice = models.IntegerField()
        optionUnderlyingSymbol = models.CharField(max_length=50)
        createdAt = models.DateTimeField(auto_now_add=True)
        updatedAt = models.DateTimeField(auto_now=True)

        def __str__(self):
            return "%s %s %s %s %s %s " \
                   "%s %s %s %s %s " \
                   "%s %s %s %s" % (
                self.instrumentId, self.instrumentType, self.symbol, self.name, self.description, self.exchange,
                self.exchangeSegment, self.series, self.exchangeInstrumentId, self.optionExpiryDate, self.optionType,
                self.optionStrikePrice, self.optionUnderlyingSymbol, self.createdAt, self.updatedAt)

    class strategyConditions(SoftDeleteModel):
        strategyConditionId = models.AutoField(primary_key=True)
        strategyId = models.ForeignKey(strategy, on_delete=models.CASCADE)
        description = models.TextField()
        type = models.CharField(max_length=20, choices=typeChoice)
        conditionType = models.CharField(max_length=20, choices=conditionTypeChoice)
        conditionConfig = models.TextField()
        createdAt = models.DateTimeField(auto_now_add=True)
        updatedAt = models.DateTimeField(auto_now=True)

        def __str__(self):
            return "%s %s %s %s %s %s %s %s" % (
                self.strategyConditionId, self.strategyId, self.description, self.type, self.conditionType,
                self.conditionConfig, self.createdAt, self.updatedAt)
