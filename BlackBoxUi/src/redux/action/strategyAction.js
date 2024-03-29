import moment from "moment";
import {
  errorAlert,
  successAlert,
} from "../../components/notification/ToastNotification";
import { instance } from "../../utils/api";
import {
  SETLEGS,
  SETLEGSLEVEL,
  SETSTRATEGYSTART,
  SET_STRATEGY_DETAILS_BY_STRATEGY_ID,
  SET_STRATEGY_LIST_BY_BASKET_ID,
} from "../types/StrategyTypes";
const strategyConditions = [
  "DAY_OF_WEEK",
  "ENTRY_DATE",
  "EXIT_DATE",
  "ENTRY_TIME",
  "EXIT_TIME",
  "ADVANCE_START_TIME",
  "ADVANCE_END_TIME",
  "STATEGY_TARGET",
  "STRATEGY_STOP_LOSS",
  "ACTIVATE_AT",
  "PROFIT_INC",
  "TSL_INC",
  "NO_OF_CYCLE",
  "CYCLE_DELAY",
  "SQR_OFF_REJECTION",
  "ALLOW_LATETRADING",
  "entryTime",
  "exitTime",
];
const legsConditions = [
  "spotOrFutures",
  "START_TIME",
  "END_TIME",
  "ENTRY_ON",
  "RE_ENTRY",
  "RE_EXECUTE",
  "WAIT_TRADE",
  "TARGET_PROFIT",
  "STOP_LOSS",
  "TRAIL_STOP_LOSS",
];
const setStrategyValues = (data) => async (dispatch) => {
  dispatch({ type: SETSTRATEGYSTART, payload: data });
};

const setLegsValues = (data) => async (dispatch) => {
  dispatch({ type: SETLEGS, payload: data });
};

const setLegsLevel = (data) => async (dispatch) => {
  dispatch({ type: SETLEGSLEVEL, payload: data });
};

const get_all_strategies_by_basketId = (basketId) => async (dispatch) => {
  try {
    const response = await instance.get(`get_strategy_leg_bId/${basketId}`);
    const sortedResponse = response.data.map((a) => ({
      ...a[0]["strategy"],
      strategyCondition: a[0]["strategyCondition"],
      legs: a[0]["legs"].map((e) => ({
        ...e[0]["leg"],
        legConditions: e[0]["legCondition"],
      })),
    }));
    console.log(sortedResponse);
    const data = sortedResponse.map((e) => {
      // const conditionsObject = [...e.strategyCondition];
      for (const condition of e.strategyCondition) {
        const { conditionType, configuration } = condition;
        e[conditionType] = configuration;
      }
      e.legs.map((a) => {
        for (const condition of a.legConditions) {
          const { legConditionType, legConfiguration } = condition;
          a[legConditionType] = legConfiguration;
        }

        return { ...a };
      });

      return { ...e, strategyType: e?.strategyCondition[0]?.strategyType };
    });

    dispatch({
      type: SET_STRATEGY_LIST_BY_BASKET_ID,
      payload: data,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const get_strategy_details_by_strategyId = (strategyId) => async (dispatch) => {
  try {
    const response = await instance.get(`get_strategy_leg/${strategyId}`);
    dispatch({
      type: SET_STRATEGY_DETAILS_BY_STRATEGY_ID,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    errorAlert("Something went wrong !");
  }
};

const create_strategy =
  (strategyDetails, legs, refresh, handleClose) => async () => {
    const data = {
      strategy: {
        ...strategyDetails,
        strategyCondition: strategyConditions
          .map((e) => {
            return {
              type: "ENTRY",
              conditionType: e,
              configuration: strategyDetails[e] || "",
              strategyType: strategyDetails["strategyType"],
            };
          })
          .filter((a) => a.configuration),

        legs: legs.map((leg) => ({
          ...leg,
          legConditions: legsConditions
            .map((key) => ({
              legType: "ENTRY",
              legConditionType: key,
              legConfiguration: leg[key] || "",
            }))
            .filter((a) => a.legConfiguration),
        })),
      },
    };

    try {
      await instance.post(`create_strategy_leg/`, data);
      await refresh();
      handleClose(false);
      successAlert("strategy created !!");
    } catch (error) {
      console.log(error);
      errorAlert("Something went wrong !");
    }
  };
export const update_strategy =
  (strategyDetails, legs, refresh, handleClose, deletedLegs, newLegs) =>
  async () => {
    console.log(strategyDetails);
    const oldConditions = strategyDetails.strategyCondition.map(
      (e) => e.conditionType
    );
    const data = {
      strategy: {
        ...strategyDetails,
        deletedStrategyConditions: strategyDetails.strategyCondition
          .map((e) => ({
            ...e,
            configuration: strategyDetails[e.conditionType],
          }))
          .filter((a) => a.configuration === " " || a.configuration === ""),
        newStrategyCondition: strategyConditions
          .filter((e) => !oldConditions.includes(e))
          .map((e) => {
            return {
              type: "ENTRY",
              conditionType: e,
              configuration: strategyDetails[e] || "",
              strategyType: strategyDetails["strategyType"],
              strategyId: strategyDetails.strategyId,
            };
          })
          .filter((a) => a.configuration !== " " && a.configuration !== ""),
        strategyCondition: strategyDetails.strategyCondition
          .map((e) => ({
            ...e,
            configuration: e.conditionType
              ? strategyDetails[e.conditionType]
              : "",
          }))
          .filter((a) => a.configuration !== " " && a.configuration !== ""),
        legs: legs.map((leg) => {
          return {
            ...leg,
            deletedLegConditions: leg.legConditions
              .map((e) => {
                return { ...e, legConfiguration: leg[e.legConditionType] };
              })
              .filter((a) => !a.legConfiguration),
            newLegConditions: legsConditions
              .filter(
                (e) =>
                  leg.legConditions
                    .map((a) => a.legConditionType)
                    .includes(e) === false
              )
              .map((key) => {
                return {
                  legType: "ENTRY",
                  legConditionType: key,
                  legConfiguration: leg[key] || "",
                  legId: leg.legId,
                };
              })
              .filter((a) => a.legConfiguration),
            legConditions: leg.legConditions
              .map((e) => {
                return { ...e, legConfiguration: leg[e.legConditionType] };
              })
              .filter(
                (a) => a.legConfiguration !== " " && a.legConfiguration !== ""
              ),
          };
        }),
      },
    };

    try {
      if (deletedLegs?.length) {
        await instance.post(`create_strategy_leg/`, {
          deleteLegs: deletedLegs,
        });
      }

      if (data.strategy.deletedStrategyConditions?.length) {
        const deletedConditions = data.strategy.deletedStrategyConditions.map(
          (e) => e.strategyConditionId
        );
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          deleteStrategyConditions: deletedConditions,
        });

        let requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          "http://localhost:8000/algoTradingApp/strategy/builder/delete_strategyConditions/",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }
      const deletedLegConditions = [];
      data.strategy.legs.map((e) => {
        if (e.deletedLegConditions && e.deletedLegConditions.length) {
          deletedLegConditions.push(...e.deletedLegConditions);
        }
      });

      if (deletedLegConditions.length) {
        let payload = deletedLegConditions.map((e) => e.legConditionId);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          deleteLegConditions: payload,
        });

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          "http://127.0.0.1:8000/algoTradingApp/strategy/builder/delete_legConditions/",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }
      await instance.put(
        `edit_strategy_leg/${strategyDetails.strategyId}`,
        data
      );
      if (data.strategy.newStrategyCondition?.length) {
        await instance.post(`create_strategyConditions/`, {
          strategyConditions: data.strategy.newStrategyCondition,
        });
      }
      const newLegConditions = [];
      data.strategy.legs.map((e) => {
        if (e.newLegConditions && e.newLegConditions.length) {
          newLegConditions.push(...e.newLegConditions);
        }
      });
      if (newLegConditions.length) {
        await instance.post(`create_legConditions/`, {
          legConditions: newLegConditions,
        });
      }
      if (newLegs.length) {
        let payload = newLegs.map((leg) => ({
          ...leg,
          legConditions: legsConditions
            .map((key) => ({
              legType: "ENTRY",
              legConditionType: key,
              legConfiguration: leg[key] || "",
            }))
            .filter((a) => a.legConfiguration),
        }));

        await instance.post(`create_leg/`, {
          legs: payload,
        });
      }
      await refresh();
      handleClose(false);
      successAlert("strategy Updated !!");
    } catch (error) {
      console.log(error);
      errorAlert("Something went wrong !");
    }
  };
const delete_strategy = (strategyId, refresh) => async (dispatch) => {
  try {
    const response1 = await instance.delete(
      `delete_strategy_leg/${strategyId}`
    );
    await refresh();
    successAlert(response1.data.res);
    return true;
  } catch (error) {
    console.log(error);
    errorAlert("Something went wrong !");
    return false;
  }
};
const delete_strategy_condition = (strategyId, refresh) => async (dispatch) => {
  try {
    const response1 = await instance.delete(`delete_strategyConditions/`);
    await refresh();
    successAlert(response1.data.res);
    return true;
  } catch (error) {
    console.log(error);
    errorAlert("Something went wrong !");
    return false;
  }
};

export {
  setStrategyValues,
  setLegsLevel,
  setLegsValues,
  get_all_strategies_by_basketId,
  get_strategy_details_by_strategyId,
  create_strategy,
  delete_strategy,
};
