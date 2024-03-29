from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import basketSerializer
from .serializers import strategySerializer, strategyConditionSerializer
from .serializers import legSerializer, legConditionSerializer
from .serializers import userSerializer
from .serializers import userBrokerMappingSerializer
from .serializers import strategyMarketPlaceSerializer, userGetSerializer, subscriptionPaymentSerializer

from algoTradingApp.models import basket
from algoTradingApp.models import strategy, strategyCondition
from algoTradingApp.models import leg, legCondition
from algoTradingApp.models import user
from algoTradingApp.models import userBrokerMapping
from algoTradingApp.models import strategyMarketPlace
from algoTradingApp.models import subscriptionPayment

class basketAPI(APIView):
    def get(self, request, *args, **kwargs):
        if 'userId' in kwargs:
            basket_instance = basket.objects.filter(userId=kwargs['userId'], is_deleted = False)
            serializer = basketSerializer(basket_instance, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"res": "Kindly provide the userID to filter the basket"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def post(self, request):
        basket_exists_instance = basket.objects.filter(basketName = request.data.get('basketName'), is_deleted=False)
        print(basket_exists_instance)
        if basket_exists_instance:
            return Response(
                {"res": "Basket with same name already exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = basketSerializer(data=request.data)
        if serializer.is_valid():  
            serializer.save()  
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)  
        else:  
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
        
    def put(self, request, basketId):
        basket_instance = basket.objects.get(basketId=basketId, is_deleted = False)
        if not basket_instance:
            return Response(
                {"res": "Object with basket ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'basketId': request.data.get('basketId'), 
            'basketName': request.data.get('basketName'), 
            'userId': request.data.get('userId'),
            'deployed' : request.data.get('deployed'),
            'shared' : request.data.get('shared')
        }
        serializer = basketSerializer(instance = basket_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, basketId):
        basket_instance = basket.objects.get(basketId=basketId, is_deleted=False)
        if not basket_instance:
            return Response(
                {"res": "Object with basket ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        basket_instance.soft_delete()
        return Response(
            {"res": "Basket deleted successfully!"},
            status=status.HTTP_200_OK
        )

    
    
class strategyAPI(APIView):
    def get(self, request, *args, **kwargs):
        if 'strategyId' in kwargs:
            leg_conditions = []
            strategyConditions = []
            strategy_instance = strategy.objects.filter(strategyId=kwargs['strategyId'], is_deleted=False)
            strategyCondition_instance = strategyCondition.objects.filter(strategyId = kwargs['strategyId'], is_deleted=False)
            print(strategyCondition_instance)
            for k in range(0, len(strategyCondition_instance)):
                strategyCondition_res = strategyCondition.objects.get(strategyConditionId = strategyCondition_instance[k].strategyConditionId, is_deleted = False)
                serializerStrategyCondition = strategyConditionSerializer(strategyCondition_res, many = False)
                strategyConditions.append(serializerStrategyCondition.data)
            leg_instance = leg.objects.filter(strategyId=kwargs['strategyId'], is_deleted=False)
            for i in range(0, len(leg_instance)):
                legCondition_instance = legCondition.objects.filter(legId = leg_instance[i].legId, is_deleted=False)
                serializerLegCondition = legConditionSerializer(legCondition_instance, many=True)
                serializerLeg = legSerializer(leg_instance[i], many = False)
                leg_conditions.append([{"leg":serializerLeg.data, "legCondition":serializerLegCondition.data}])
            serializer = strategySerializer(strategy_instance, many = True)
            #serializerStrategyCondition = strategyConditionSerializer(strategyCondition_instance, many=True)
            Serializer_list = [{"strategy":serializer.data[0], "strategyCondition":strategyConditions, "legs":leg_conditions}]
            #res = {"strategy" : serializer.data, "strategyCondition" : serializerStrategyCondition.data, "legs" : serializerLeg.data, "legConditions" : leg_conditions}
            return Response(data = Serializer_list[0], status=status.HTTP_200_OK)
        elif 'basketId' in kwargs:
            strategies = []
            leg_conditions = []
            strategyConditions = []
            strategy_instance = strategy.objects.filter(basketId = kwargs['basketId'], is_deleted=False)
            for i in range(0,len(strategy_instance)):
                strategyConditions = []
                strategyCondition_instance = strategyCondition.objects.filter(strategyId = strategy_instance[i].strategyId, is_deleted=False)
                for k in range(0, len(strategyCondition_instance)):
                    strategyCondition_result = strategyCondition.objects.get(strategyConditionId = strategyCondition_instance[k].strategyConditionId, is_deleted = False)
                    serializerStrategyCondition = strategyConditionSerializer(strategyCondition_result, many=False)
                    strategyConditions.append(serializerStrategyCondition.data)
                leg_instance = leg.objects.filter(strategyId=strategy_instance[i].strategyId, is_deleted=False)
                leg_conditions = []
                for j in range(0, len(leg_instance)):
                    legCondition_instance = legCondition.objects.filter(legId = leg_instance[j].legId, is_deleted=False)
                    serializerLegCondition = legConditionSerializer(legCondition_instance, many=True)
                    serializerLeg = legSerializer(leg_instance[j], many = False)
                    leg_conditions.append([{"leg":serializerLeg.data, "legCondition":serializerLegCondition.data}])
                serializer = strategySerializer(strategy_instance[i], many = False)
                #serializerStrategyCondition = strategyConditionSerializer(strategyCondition_instance, many=False)
                Serializer_list = [{"strategy":serializer.data, "strategyCondition":strategyConditions, "legs": leg_conditions}]
                strategies.append(Serializer_list)
            return Response(data = strategies, status=status.HTTP_200_OK)
        else:
            return Response(
                {"res": "Kindly provide the strategyId or basketId to filter the strategy"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def post(self, request):
        deleteLegs = request.data.get('deleteLegs')
        if deleteLegs:
            for i in range(0,len(deleteLegs)):
                leg_instance_delete = leg.objects.get(legId = deleteLegs[i])
                legCondition_instance = legCondition.objects.filter(legId=deleteLegs[i])
                for j in range(0, len(legCondition_instance)):
                    legCondition_instance_delete = legCondition.objects.get(legConditionId = legCondition_instance[j].legConditionId)
                    legCondition_instance_delete.soft_delete()
                leg_instance_delete.soft_delete()
            return Response(
                {"res": "Legs deleted successfully!"},
                status=status.HTTP_200_OK
            ) 
        data = {
            'basketId' : request.data.get('strategy')['basketId'],
            'strategyName' : request.data.get('strategy')['strategyName'],
            'strategyShortDescription' : request.data.get('strategy')['strategyShortDescription'],
            'strategyLongDescription' : request.data.get('strategy')['strategyLongDescription'],
            'index' : request.data.get('strategy')['index'],
            'segment' : request.data.get('strategy')['segment'],
            'orderType' : request.data.get('strategy')['orderType']
        }
        strategy_exists_instance = strategy.objects.filter(basketId = request.data.get('strategy')['basketId'], strategyName = request.data.get('strategy')['strategyName'], is_deleted=False)
        if strategy_exists_instance:
            return Response(
                {"res": "Strategy with same name already exists in this basket"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = strategySerializer(data = data, partial = True)
        if serializer.is_valid():
            serializer.save()
            a = strategy.objects.latest('strategyId')
            for k in range(0, len(request.data.get('strategy')['strategyCondition'])):
                strategyConditionData = {
                    'strategyId' : a.strategyId,
                    'type' : request.data.get('strategy')['strategyCondition'][k]['type'],
                    'conditionType' : request.data.get('strategy')['strategyCondition'][k]['conditionType'], 
                    'configuration' : request.data.get('strategy')['strategyCondition'][k]['configuration'],
                    'strategyType' : request.data.get('strategy')['strategyCondition'][k]['strategyType']
                }
                serializerStrategyCondition = strategyConditionSerializer(data = strategyConditionData, partial = True)
                if serializerStrategyCondition.is_valid():
                    serializerStrategyCondition.save()
                else:
                    strategy_instance_delete = strategy.objects.get(strategyId=a.strategyId, is_deleted=False)
                    strategy_instance_delete.delete()
                    return Response(serializerStrategyCondition.errors, status=status.HTTP_400_BAD_REQUEST)
            for i in range(0, len(request.data.get('strategy')['legs'])):
                dataLeg = {
                'strategyId' : a.strategyId,
                'legOrderType' : request.data.get('strategy')['legs'][i]['legOrderType'],
                'tradeType' : request.data.get('strategy')['legs'][i]['tradeType'],
                'expiryDate' : request.data.get('strategy')['legs'][i]['expiryDate'],
                'legCondition' : request.data.get('strategy')['legs'][i]['legCondition'],
                'strikePrice' : request.data.get('strategy')['legs'][i]['strikePrice'],
                'totalLots' : request.data.get('strategy')['legs'][i]['totalLots']
                }
                serializerLeg = legSerializer(data = dataLeg, partial = True)
                if serializerLeg.is_valid():
                    serializerLeg.save()
                    b = leg.objects.latest('legId')
                    for j in range(0, len(request.data.get('strategy')['legs'][i]['legConditions'])):
                        dataLegCondition = {
                            'legId' : b.legId,
                            'legType' : request.data.get('strategy')['legs'][i]['legConditions'][j]['legType'],
                            'legConditionType' : request.data.get('strategy')['legs'][i]['legConditions'][j]['legConditionType'],
                            'legConfiguration' : request.data.get('strategy')['legs'][i]['legConditions'][j]['legConfiguration']
                        }
                        serializerLegCondition = legConditionSerializer(data = dataLegCondition, partial = True)
                        if serializerLegCondition.is_valid():
                            serializerLegCondition.save()
                        else:
                            strategy_instance_delete = strategy.objects.get(strategyId=a.strategyId, is_deleted=False)
                            strategy_instance_delete.delete()
                            for j in range(0,i):
                                b = leg.objects.latest('legId')
                                leg_instance_delete = leg.objects.get(legId = b.legId, is_deleted = False)
                                leg_instance_delete.delete()
                            strategyCondition_instance_delete = strategyCondition.objects.get(strategyId = a.strategyId, is_deleted = False)
                            strategyCondition_instance_delete.delete()
                            return Response(serializerLegCondition.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    strategy_instance_delete = strategy.objects.get(strategyId=a.strategyId, is_deleted=False)
                    strategy_instance_delete.delete()
                    for j in range(0,i):
                        b = leg.objects.latest('legId')
                        leg_instance_delete = leg.objects.get(legId = b.legId, is_deleted = False)
                        leg_instance_delete.delete()
                    strategyCondition_instance_delete = strategyCondition.objects.filter(strategyId = a.strategyId, is_deleted = False)
                    strategyCondition_instance_delete.delete()
                    return Response(serializerLeg.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(request.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, strategyId):
        strategy_instance = strategy.objects.get(strategyId=strategyId, is_deleted=False)
        if not strategy_instance:
            return Response(
                {"res": "Object with strategy ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        """strategy_exists_instance = strategy.objects.filter(basketId = request.data.get('strategy')['basketId'], strategyName = request.data.get('strategy')['strategyName'], is_deleted=False)
        print(strategy_exists_instance)
        if strategy_exists_instance[0].strategyId != strategyId:
            return Response(
                {"res": "Strategy with same name already exists in this basket"}, 
                status=status.HTTP_400_BAD_REQUEST
            )"""
        data = {
            'basketId' : request.data.get('strategy')['basketId'],
            'strategyName' : request.data.get('strategy')['strategyName'],
            'strategyShortDescription' : request.data.get('strategy')['strategyShortDescription'],
            'strategyLongDescription' : request.data.get('strategy')['strategyLongDescription'],
            'index' : request.data.get('strategy')['index'],
            'segment' : request.data.get('strategy')['segment'],
            'orderType' : request.data.get('strategy')['orderType']
        }
        serializer = strategySerializer(instance = strategy_instance, data = data, partial = True)
        if serializer.is_valid():
            serializer.save()
            strategyCondition_instance = strategyCondition.objects.filter(strategyId=strategyId, is_deleted=False)
            for k in range(0, len(strategyCondition_instance)):
                strategyConditionData = {
                    'strategyId' : strategyId,
                    'type' : request.data.get('strategy')['strategyCondition'][k]['type'],
                    'conditionType' : request.data.get('strategy')['strategyCondition'][k]['conditionType'], 
                    'configuration' : request.data.get('strategy')['strategyCondition'][k]['configuration'],
                    'strategyType' : request.data.get('strategy')['strategyCondition'][k]['strategyType']
                }
                serializerStrategyCondition = strategyConditionSerializer(instance=strategyCondition_instance[k], data = strategyConditionData, partial = True)
                if serializerStrategyCondition.is_valid():
                    serializerStrategyCondition.save()
                else:
                    return Response(serializerStrategyCondition.errors, status=status.HTTP_400_BAD_REQUEST)
            for i in range(0, len(request.data.get('strategy')['legs'])):
                dataLeg = {
                'strategyId' : strategyId,
                'legOrderType' : request.data.get('strategy')['legs'][i]['legOrderType'],
                'tradeType' : request.data.get('strategy')['legs'][i]['tradeType'],
                'expiryDate' : request.data.get('strategy')['legs'][i]['expiryDate'],
                'legCondition' : request.data.get('strategy')['legs'][i]['legCondition'],
                'strikePrice' : request.data.get('strategy')['legs'][i]['strikePrice'],
                'totalLots' : request.data.get('strategy')['legs'][i]['totalLots']
                }
                leg_instance = leg.objects.get(legId = request.data.get('strategy')['legs'][i]['legId'])
                serializerLeg = legSerializer(instance=leg_instance, data = dataLeg, partial = True)
                if serializerLeg.is_valid():
                    serializerLeg.save()
                    for j in range(0, len(request.data.get('strategy')['legs'][i]['legConditions'])):
                        dataLegCondition = {
                            'legId' : request.data.get('strategy')['legs'][i]['legId'],
                            'legType' : request.data.get('strategy')['legs'][i]['legConditions'][j]['legType'],
                            'legConditionType' : request.data.get('strategy')['legs'][i]['legConditions'][j]['legConditionType'],
                            'legConfiguration' : request.data.get('strategy')['legs'][i]['legConditions'][j]['legConfiguration']
                        }
                        legCondition_instance = legCondition.objects.get(legConditionId = request.data.get('strategy')['legs'][i]['legConditions'][j]['legConditionId'])
                        serializerLegCondition = legConditionSerializer(instance=legCondition_instance,data = dataLegCondition, partial = True)
                        if serializerLegCondition.is_valid():
                            serializerLegCondition.save()
                        else:
                            return Response(serializerLegCondition.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response(serializerLeg.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(request.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, strategyId):
        strategy_instance = strategy.objects.get(strategyId=strategyId)
        if not strategy_instance:
            return Response(
                {"res": "Object with strategy ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        strategy_instance.soft_delete()
        leg_instance = leg.objects.filter(strategyId = strategyId)
        for i in range(0, len(leg_instance)):
            leg_instance_delete = leg.objects.get(legId = leg_instance[i].legId)
            legCondition_instance = legCondition.objects.filter(legId=leg_instance[i].legId)
            for j in range(0, len(legCondition_instance)):
                legCondition_instance_delete = legCondition.objects.get(legConditionId = legCondition_instance[j].legConditionId)
                legCondition_instance_delete.soft_delete()
            leg_instance_delete.soft_delete()
        return Response(
            {"res": "strategy with its leg deleted successfully!"},
            status=status.HTTP_200_OK
        )
    
    
class legAPI(APIView):
    """def get(self, request, *args, **kwargs):
        if 'legId' in kwargs:
            leg_instance = leg.objects.filter(legId=kwargs['legId'], is_deleted=False)
            serializer = legSerializer(leg_instance, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        leg_instance = leg.undeleted_objects.all()
        serializer = legSerializer(leg_instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)"""
    
    def post(self, request):
        for i in range(0, len(request.data.get('legs'))):
            strategy_instance = strategy.objects.get(strategyId = request.data.get('legs')[i]['strategyId'])
            if not strategy_instance:
                return Response(
                {"res": "Object with strategy ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
                )
            dataLeg = {
               'strategyId' : request.data.get('legs')[i]['strategyId'],
               'legOrderType' : request.data.get('legs')[i]['legOrderType'],
               'tradeType' : request.data.get('legs')[i]['tradeType'],
               "expiryDate" : request.data.get('legs')[i]['expiryDate'],
               'legCondition' : request.data.get('legs')[i]['legCondition'],
            #    'spotOrFutures' : request.data.get('legs')[i]['spotOrFutures'],
            #    'reEntryOrReExecute' : request.data.get('legs')[i]['reEntryOrReExecute'],
               'strikePrice' : request.data.get('legs')[i]['strikePrice'],
               'totalLots' : request.data.get('legs')[i]['totalLots'],
            }
            serializer = legSerializer(data=dataLeg)
            if serializer.is_valid():  
                serializer.save() 
                a = leg.objects.latest('legId')
                for j in range(0, len(request.data.get('legs')[i]['legConditions'])):
                    dataLegCondition = {
                                'legId' : a.legId,
                                'legType' : request.data.get('legs')[i]['legConditions'][j]['legType'],
                                'legConditionType' : request.data.get('legs')[i]['legConditions'][j]['legConditionType'],
                                'legConfiguration' : request.data.get('legs')[i]['legConditions'][j]['legConfiguration']
                            }
                    serializerLegCondition = legConditionSerializer(data = dataLegCondition, partial = True)
                    if serializerLegCondition.is_valid():
                        serializerLegCondition.save()  
                    else:
                        return Response({"status": "error", "data": serializerLegCondition.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:  
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
        return Response({"status": "success", "data": request.data}, status=status.HTTP_200_OK) 
        
    '''def put(self, request, legId):
        leg_instance = leg.objects.get(legId=legId)
        if not leg_instance:
            return Response(
                {"res": "Object with leg ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'legId': request.data.get('legId'),
            'basketId': request.data.get('basketId'), 
            'strategyId': request.data.get('strategyId'),
            'squareOffOneLeg': request.data.get('squareOffOneLeg'),
            'squareOffAllLegs': request.data.get('squareOffAllLegs'),
            'waitAndTrade': request.data.get('waitAndTrade'),
            'moveSLToCost': request.data.get('moveSLToCost'),
            'reentryOrReexecute': request.data.get('reentryOrReexecute'),
            'targetProfit': request.data.get('targetProfit'),
            'stopLoss': request.data.get('stopLoss'),
            'trailStopLoss': request.data.get('trailStopLoss'),
            'strategyTargetProfit': request.data.get('strategyTargetProfit'),
            'strategyStopLoss': request.data.get('strategyStopLoss'),
            'strategyType': request.data.get('strategyType')
        }
        serializer = legSerializer(instance = leg_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''

    def delete(self, request, legId):
        leg_instance = leg.objects.get(legId=legId)
        if not leg_instance:
            return Response(
                {"res": "Object with leg ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        legCondition_instance = legCondition.objects.filter(legId=legId)
        for j in range(0, len(legCondition_instance)):
            legCondition_instance_delete = legCondition.objects.get(legConditionId = legCondition_instance[j].legConditionId)
            legCondition_instance_delete.soft_delete()
        leg_instance.soft_delete()
        return Response(
            {"res": "Leg and its legConditions deleted successfully!"},
            status=status.HTTP_200_OK
        )

class strategyConditionAPI(APIView):
    def post(self, request):
        for i in range(0, len(request.data.get('strategyConditions'))):
            strategy_instance = strategy.objects.get(strategyId = request.data.get('strategyConditions')[i]['strategyId'])
            if not strategy_instance:
                return Response(
                {"res": "Object with strategy ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
                )
            dataStrategyCondition = {
               'strategyId' : request.data.get('strategyConditions')[i]['strategyId'],
               'type' : request.data.get('strategyConditions')[i]['type'],
               'conditionType' : request.data.get('strategyConditions')[i]['conditionType'],
               "configuration" : request.data.get('strategyConditions')[i]['configuration'],
               'strategyType' : request.data.get('strategyConditions')[i]['strategyType']
            }
            serializer = strategyConditionSerializer(data=dataStrategyCondition)
            if serializer.is_valid():  
                serializer.save() 
            else:  
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
        return Response({"status": "success", "data": request.data}, status=status.HTTP_200_OK) 

    def delete(self, request):
        deleteStrategyCondition = request.data.get('deleteStrategyConditions')
        if deleteStrategyCondition:
            for i in range(0,len(deleteStrategyCondition)):
                strategyCondition_instance_delete = strategyCondition.objects.get(strategyConditionId = deleteStrategyCondition[i])
                strategyCondition_instance_delete.soft_delete()
            return Response(
                {"res": "StrategyConditions deleted successfully!"},
                status=status.HTTP_200_OK
            ) 

class legConditionAPI(APIView):
    def post(self, request):
        for i in range(0, len(request.data.get('legConditions'))):
            leg_instance = leg.objects.get(legId = request.data.get('legConditions')[i]['legId'])
            if not leg_instance:
                return Response(
                {"res": "Object with leg ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
                )
            dataLegCondition = {
               'legId' : request.data.get('legConditions')[i]['legId'],
               'legType' : request.data.get('legConditions')[i]['legType'],
               'legConditionType' : request.data.get('legConditions')[i]['legConditionType'],
               "legConfiguration" : request.data.get('legConditions')[i]['legConfiguration']
            }
            serializer = legConditionSerializer(data=dataLegCondition)
            if serializer.is_valid():  
                serializer.save() 
            else:  
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
        return Response({"status": "success", "data": request.data}, status=status.HTTP_200_OK) 

    def delete(self, request):
        deleteLegCondition = request.data.get('deleteLegConditions')
        if deleteLegCondition:
            for i in range(0,len(deleteLegCondition)):
                legCondition_instance_delete = legCondition.objects.get(legConditionId = deleteLegCondition[i])
                legCondition_instance_delete.soft_delete()
            return Response(
                {"res": "LegConditions deleted successfully!"},
                status=status.HTTP_200_OK
            )    


class userAPI(APIView):
    def get(self, request, *args, **kwargs):
        if 'userContactNumber' and 'userPassword' in kwargs:
            user_instance = user.objects.filter(userContactNumber = kwargs['userContactNumber'], userPassword = kwargs['userPassword'], is_deleted=False)
            if user_instance:
                serializer = userGetSerializer(user_instance, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                user_exists_instance = user.objects.filter(userContactNumber = kwargs['userContactNumber'])
                if user_exists_instance:
                    return Response({"res": "Incorrect Password"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"res": "No such user exists"}, status=status.HTTP_400_BAD_REQUEST)                
        elif 'userId' in kwargs:
            user_instance = user.objects.filter(userId=kwargs['userId'], is_deleted=False).values('userId', 'userName', 'userContactNumber', 'userEmail')
            serializer = userGetSerializer(user_instance, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif 'userContactNumber' in kwargs:
            user_instance = user.objects.filter(userContactNumber = kwargs['userContactNumber'], is_deleted=False).values('userId', 'userName', 'userContactNumber', 'userEmail')
            serializer = userGetSerializer(user_instance, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        user_instance = user.undeleted_objects.all().values('userId', 'userName', 'userContactNumber', 'userEmail')
        serializer = userGetSerializer(user_instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():  
            serializer.save()  
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)  
        else:  
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
        
    def put(self, request, userId):
        user_instance = user.objects.get(userId=userId)
        if not user_instance:
            return Response(
                {"res": "Object with user ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'userId': request.data.get('userId'),
            'userName': request.data.get('userName'), 
            'strategyId': request.data.get('strategyId'),
            'userContactNumber': request.data.get('userContactNumber'),
            'userPassword': request.data.get('userPassword'),
            'userEmail': request.data.get('userEmail')
        }
        serializer = userSerializer(instance = user_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userId):
        user_instance = user.objects.get(userId=userId)
        if not user_instance:
            return Response(
                {"res": "Object with user ID does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        user_instance.soft_delete()
        return Response(
            {"res": "User deleted successfully!"},
            status=status.HTTP_200_OK
        )

    
class userBrokerMappingAPI(APIView):
    def get(self, request, *args, **kwargs):
        user_broker_instance_all = userBrokerMapping.objects.all()
        if 'userId' and 'brokerName' in kwargs:
            user_broker_instance = user_broker_instance_all.filter(userId=kwargs['userId'], brokerName=kwargs['brokerName'], is_deleted=False)
            serializer = userBrokerMappingSerializer(user_broker_instance, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif 'userId' in kwargs:
            user_broker_instance = user_broker_instance_all.filter(userId=kwargs['userId'], is_deleted=False)
            serializer = userBrokerMappingSerializer(user_broker_instance, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"res": "Kindly provide the userId and the brokerName"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def post(self, request):
        serializer = userBrokerMappingSerializer(data=request.data)
        if serializer.is_valid():  
            user_broker_instance_all = userBrokerMapping.objects.all()
            user_broker_instance = user_broker_instance_all.filter(userId=request.data.get('userId'), brokerName=request.data.get('brokerName'), brokerUserName=request.data.get('brokerUserName'), brokerPassword=request.data.get('brokerPassword'), is_deleted=False).first()
            if user_broker_instance:
                return Response(
                {"res": "This user broker mapping already exists."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            else:
                serializer.save()  
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)  
        else:  
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
        
    def put(self, request, userId, brokerName):
        #user_broker_instance_all = userBrokerMapping.objects.all()
        user_broker_instance = userBrokerMapping.objects.get(userId=userId, brokerName=brokerName, is_deleted=False)
        if not user_broker_instance:
            return Response(
                {"res": "Object with user ID and the corresponding broker does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'userId': request.data.get('userId'),
            'brokerName': request.data.get('brokerName'), 
            'exchange': request.data.get('exchange'),
            'brokerUserName': request.data.get('brokerUserName'),
            'brokerPassword': request.data.get('brokerPassword'),
            'appKey': request.data.get('appKey'),
            'secreteKey': request.data.get('secreteKey'),
            'secreteToken': request.data.get('secreteToken'),
            'totpToken': request.data.get('totpToken')
            
        }
        serializer = userBrokerMappingSerializer(instance = user_broker_instance, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userId, brokerName):
        user_broker_instance_all = userBrokerMapping.objects.all()
        user_broker_instance = user_broker_instance_all.filter(userId=userId, brokerName=brokerName, is_deleted=False).first()
        if not user_broker_instance:
            return Response(
                {"res": "Object with user ID and the corresponding broker does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        user_broker_instance.soft_delete()
        return Response(
            {"res": "User and its corresponding broker deleted successfully!"},
            status=status.HTTP_200_OK
        )

class strategyMarketPlaceAPI(APIView):
    def get(self, request, *args, **kwargs):
        strategyMarketPlace_instance = strategyMarketPlace.undeleted_objects.all()
        serializer = strategyMarketPlaceSerializer(strategyMarketPlace_instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        user_instance = user.objects.get(userId = request.data.get('userId'))
        basket_instance = basket.objects.get(basketId = request.data.get('basketId'))
        data = {
            'userId': request.data.get('userId'),
            'strategyCreaterName' : user_instance.userName,
            'basketId': request.data.get('basketId'), 
            'basketName': basket_instance.basketName,
            'exchange': request.data.get('exchange'),
            'capitalRequired': request.data.get('capitalRequired'),
            'drawDownPercent': request.data.get('drawDownPercent'),
            'returnOfInvestmentPercent': request.data.get('returnOfInvestmentPercent'),
            'subscriptionFee' : request.data.get('subscriptionFee'),
            'subscriptionType': request.data.get('subscriptionType'),
            'numberOfUsersSubscribed': request.data.get('numberOfUsersSubscribed')
            
        }
        serializer = strategyMarketPlaceSerializer(data=data)
        if serializer.is_valid():  
            serializer.save()  
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)  
        else:  
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
        
    def delete(self, request, strategyMarketPlaceId):
        strategyMarketPlace_instance = strategyMarketPlace.objects.get(strategyMarketPlaceId = strategyMarketPlaceId)
        if not strategyMarketPlace_instance:
            return Response(
                {"res": "Object with strategyMarketPlace id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        strategyMarketPlace_instance.soft_delete()
        return Response(
            {"res": "StrategyMarketPlace deleted!"},
            status=status.HTTP_200_OK
        )


# subscriptionPaymnetApi(APIView):
 #   def 