# Generated by Django 4.2.1 on 2023-08-28 03:40

import algoTradingApp.models
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="basket",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                ("basketId", models.AutoField(primary_key=True, serialize=False)),
                ("basketName", models.CharField(max_length=25)),
                ("deployed", models.BooleanField()),
                ("shared", models.BooleanField()),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="batchOrderLegs",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("is_deleted", models.BooleanField(default=False)),
                ("orderBatchId", models.CharField(max_length=50)),
                ("orderPayload", models.TextField()),
                ("orderSentTime", models.DateTimeField()),
                ("clientId", models.CharField(max_length=50)),
                ("orderBatchStatus", models.CharField(max_length=25)),
                ("strategyEntryId", models.CharField(max_length=50)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="instrument",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                ("instrumentId", models.AutoField(primary_key=True, serialize=False)),
                (
                    "instrumentType",
                    models.CharField(
                        choices=[("BASE_INDEX", "BASE_INDEX"), ("OPTION", "OPTION")],
                        max_length=20,
                    ),
                ),
                ("symbol", models.CharField(max_length=100)),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("exchange", models.CharField(max_length=100)),
                ("exchangeSegment", models.IntegerField()),
                ("series", models.CharField(max_length=20)),
                ("exchangeInstrumentId", models.CharField(max_length=50)),
                ("optionExpiryDate", models.DateField()),
                ("optionStrikePrice", models.IntegerField()),
                ("optionUnderlyingSymbol", models.CharField(max_length=50)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="leg",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                ("legId", models.AutoField(primary_key=True, serialize=False)),
                (
                    "legOrderType",
                    models.CharField(
                        choices=[("CE", "CE"), ("PE", "PE")], max_length=5
                    ),
                ),
                (
                    "tradeType",
                    models.CharField(
                        choices=[("BUY", "BUY"), ("SELL", "SELL")], max_length=5
                    ),
                ),
                ("expiryDate", models.DateTimeField()),
                (
                    "legCondition",
                    models.CharField(
                        choices=[
                            ("ATM_POINT", "ATM_POINT"),
                            ("ATM_PERCENT", "ATM_PERCENT"),
                            ("CLOSEST_PREMIUM", "CLOSEST_PREMIUM"),
                        ],
                        max_length=20,
                    ),
                ),
                ("spotOrFutures", models.BooleanField()),
                ("reEntryOrReExecute", models.BooleanField()),
                ("strikePrice", models.CharField(max_length=20)),
                ("totalLots", models.IntegerField()),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="strategy",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                ("strategyId", models.AutoField(primary_key=True, serialize=False)),
                ("strategyName", models.CharField(max_length=25)),
                (
                    "index",
                    models.CharField(
                        choices=[
                            ("NIFTY", "NIFTY"),
                            ("BANKNIFTY", "BANKNIFTY"),
                            ("FINNIFTY", "FINNIFTY"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "segment",
                    models.CharField(
                        choices=[
                            ("OPTIONS", "OPTIONS"),
                            ("FUTURES", "FUTURES"),
                            ("EQUITY", "EQUITY"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "orderType",
                    models.CharField(
                        choices=[("MIS", "MIS"), ("NRML", "NRML"), ("CNC", "CNC")],
                        max_length=5,
                    ),
                ),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "basketId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.basket",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="strategyExecutions",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("is_deleted", models.BooleanField(default=False)),
                ("orderBatchId", models.CharField(max_length=50)),
                ("orderPayload", models.TextField()),
                ("orderSentTime", models.DateTimeField()),
                ("clientId", models.CharField(max_length=50)),
                ("orderBatchStatus", models.CharField(max_length=25)),
                ("strategyEntryId", models.CharField(max_length=50)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="strategyMarketPlace",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                (
                    "strategyMarketPlaceId",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("strategyCreaterName", models.CharField(max_length=25)),
                ("basketName", models.CharField(max_length=25)),
                ("exchange", models.CharField(max_length=20)),
                ("capitalRequired", models.FloatField()),
                ("drawDownPercent", models.FloatField()),
                ("returnOfInvestmentPercent", models.FloatField()),
                ("subscriptionFee", models.FloatField()),
                (
                    "subscriptionType",
                    models.CharField(
                        choices=[("FLAT_FEE", "FLAT_FEE"), ("SHARING", "SHARING")],
                        max_length=20,
                    ),
                ),
                ("numberOfUsersSubscribed", models.IntegerField()),
                ("active", models.BooleanField()),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "basketId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.basket",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="user",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                ("userId", models.AutoField(primary_key=True, serialize=False)),
                ("userName", models.CharField(max_length=25)),
                (
                    "userContactNumber",
                    phonenumber_field.modelfields.PhoneNumberField(
                        max_length=128, region=None, unique=True
                    ),
                ),
                ("userPassword", models.CharField(max_length=20)),
                (
                    "userEmail",
                    models.CharField(
                        max_length=40, validators=[algoTradingApp.models.validateEmail]
                    ),
                ),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="userBrokerMapping",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                (
                    "userBrokerMappingId",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                (
                    "brokerName",
                    models.CharField(
                        choices=[
                            ("IIFL", "IIFL"),
                            ("ECNO", "ECNO"),
                            ("ZERODHA", "ZERODHA"),
                            ("ALICEBLUE", "ALICEBLUE"),
                            ("JAINAM", "JAINAM"),
                        ],
                        max_length=20,
                    ),
                ),
                ("exchange", models.CharField(max_length=20)),
                ("brokerUserName", models.CharField(max_length=30)),
                ("brokerPassword", models.CharField(max_length=30)),
                ("appKey", models.CharField(max_length=100)),
                ("secreteKey", models.CharField(max_length=100)),
                ("secreteToken", models.CharField(max_length=100)),
                ("totpToken", models.CharField(max_length=100)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "userId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.user",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="subscriptionPayment",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                (
                    "subscriptionPaymentId",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("basketName", models.CharField(max_length=25)),
                ("paymentStatus", models.BooleanField()),
                ("paymentId", models.CharField(max_length=100)),
                ("rejectionReason", models.CharField(max_length=100)),
                ("paymentPayloadDump", models.CharField(max_length=100)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "basketId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.basket",
                    ),
                ),
                (
                    "subscriptionFee",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.strategymarketplace",
                    ),
                ),
                (
                    "userId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.user",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="strategymarketplace",
            name="userId",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="algoTradingApp.user"
            ),
        ),
        migrations.CreateModel(
            name="strategyConditions",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                (
                    "strategyConditionId",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("description", models.TextField()),
                (
                    "type",
                    models.CharField(
                        choices=[("ENTRY", "ENTRY"), ("EXIT", "EXIT")], max_length=20
                    ),
                ),
                (
                    "conditionType",
                    models.CharField(
                        choices=[
                            ("TIME", "TIME"),
                            ("DAY_OF_WEEK", "DAY_OF_WEEK"),
                            ("INSTRUMENT_PRICE", "INSTRUMENT_PRICE"),
                            ("PROFIT_PERCENT", "PROFIT_PERCENT"),
                        ],
                        max_length=20,
                    ),
                ),
                ("conditionConfig", models.TextField()),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "strategyId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.strategy",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="strategyCondition",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                (
                    "strategyConditionId",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                (
                    "type",
                    models.CharField(
                        choices=[("ENTRY", "ENTRY"), ("EXIT", "EXIT")], max_length=10
                    ),
                ),
                (
                    "conditionType",
                    models.CharField(
                        choices=[
                            ("TIME", "TIME"),
                            ("DAY_OF_WEEK", "DAY_OF_WEEK"),
                            ("INSTRUMENT_PRICE", "INSTRUMENT_PRICE"),
                            ("PROFIT_PERCENT", "PROFIT_PERCENT"),
                        ],
                        max_length=50,
                    ),
                ),
                ("configuration", models.CharField(max_length=100)),
                (
                    "strategyType",
                    models.CharField(
                        choices=[
                            ("INTRADAY", "INTRADAY"),
                            ("POSITIONAL", "POSITIONAL"),
                            ("STBT/BTST", "STBT/BTST"),
                        ],
                        max_length=10,
                    ),
                ),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "strategyId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.strategy",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="orderStatus",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                ("orderStatusId", models.AutoField(primary_key=True, serialize=False)),
                ("orderBatchId", models.CharField(max_length=100)),
                ("orderSequenceNumber", models.IntegerField()),
                ("orderResponse", models.TextField()),
                (
                    "orderStatus",
                    models.CharField(
                        choices=[("SUCCESS", "SUCCESS"), ("FAILED", "FAILED")],
                        max_length=10,
                    ),
                ),
                ("brokerOrderId", models.CharField(max_length=25)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "legId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.leg",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="legCondition",
            fields=[
                ("is_deleted", models.BooleanField(default=False)),
                ("legConditionId", models.AutoField(primary_key=True, serialize=False)),
                (
                    "legType",
                    models.CharField(
                        choices=[("ENTRY", "ENTRY"), ("EXIT", "EXIT")], max_length=20
                    ),
                ),
                (
                    "legConditionType",
                    models.CharField(
                        choices=[
                            ("TARGET_PROFIT", "TARGET_PROFIT"),
                            ("STOP_LOSS", "STOP_LOSS"),
                            ("TRAIL_STOP_LOSS", "TRAIL_STOP_LOSS"),
                        ],
                        max_length=50,
                    ),
                ),
                ("legConfiguration", models.CharField(max_length=100)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "legId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.leg",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="leg",
            name="strategyId",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="algoTradingApp.strategy",
            ),
        ),
        migrations.AddField(
            model_name="basket",
            name="userId",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="algoTradingApp.user"
            ),
        ),
        migrations.CreateModel(
            name="activeStrategyLegs",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("is_deleted", models.BooleanField(default=False)),
                ("date", models.DateTimeField()),
                ("strategyEntryId", models.CharField(max_length=50)),
                ("underlyingSymbol", models.CharField(max_length=20)),
                (
                    "tradeType",
                    models.CharField(
                        choices=[("BUY", "BUY"), ("SELL", "SELL")], max_length=20
                    ),
                ),
                ("totalLots", models.IntegerField()),
                ("expiryDate", models.DateTimeField()),
                ("derivedAtmStrike", models.IntegerField()),
                ("derivedExecutionStrike", models.IntegerField()),
                ("tradeSymbol", models.CharField(max_length=50)),
                ("exchangeSegment", models.CharField(max_length=50)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                ("updatedAt", models.DateTimeField(auto_now=True)),
                (
                    "strategyId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.strategy",
                    ),
                ),
                (
                    "strategyLegId",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="algoTradingApp.leg",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
