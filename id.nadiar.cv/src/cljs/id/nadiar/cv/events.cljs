(ns id.nadiar.cv.events
  (:require
   [re-frame.core :as re-frame]
   [id.nadiar.cv.db :as db]
   [day8.re-frame.http-fx :as http-fx]
   [ajax.core :as ajax]
   ))

(re-frame/reg-event-db
  ::success-fetch-json-cv
 (fn [db [_ response]]
   (-> db
       (assoc :cv response)
       (assoc-in [:ajax :fetch-json-cv :loading] false))))

(re-frame/reg-event-db
  ::failure-fetch-json-cv
 (fn [db [_ response]]
   (-> db
       (assoc :error response)
       (assoc-in [:ajax :fetch-json-cv :loading] false))))

(re-frame/reg-event-fx
  ::fetch-json-cv
  (fn [{:keys [db]} _]
    {:db (assoc-in db [:ajax :fetch-json-cv :loading] true)
     :http-xhrio {:method :get
                  :uri "https://raw.githubusercontent.com/codxse/my-cv/master/data.json"
                  :timeout 8000
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success [::success-fetch-json-cv]
                  :on-failure [::failure-fetch-json-cv]}}))

(re-frame/reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))
