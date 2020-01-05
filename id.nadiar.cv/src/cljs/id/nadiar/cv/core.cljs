(ns id.nadiar.cv.core
  (:require
   [reagent.core :as reagent]
   [re-frame.core :as re-frame]
   [id.nadiar.cv.events :as events]
   [id.nadiar.cv.views :as views]
   [id.nadiar.cv.config :as config]
   ))


(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

(defn ^:dev/after-load mount-root []
  (re-frame/clear-subscription-cache!)
  (reagent/render [views/main-panel]
                  (.getElementById js/document "app")))

(defn init []
  (re-frame/dispatch-sync [::events/initialize-db])
  (re-frame/dispatch-sync [::events/fetch-json-cv])
  (dev-setup)
  (mount-root))
