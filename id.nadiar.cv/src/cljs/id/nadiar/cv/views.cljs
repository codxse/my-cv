(ns id.nadiar.cv.views
  (:require
   [re-frame.core :as re-frame]
   [id.nadiar.cv.subs :as subs]
   [re-view.re-frame-simple :as db]
   [reagent.core :as r]
   ))

(defn Header []
  [:div.row
   [:div.col-3.col
    [:img {:src (db/get-in [:cv :header :avatarUrl])}]]
   [:div.col-9.col
    [:div.row
     [:h1 {:style {:margin 0}} (db/get-in [:cv :header :hero :name])]]
    [:div.row
     [:h4 {:style {:margin 0}} (db/get-in [:cv :header :hero :jobTitle])]]
    [:div.row
     [:span (db/get-in [:cv :header :hero :description])]]]])

(defn SidebarContent [label value]
 [:div {:style {:margin "0 0 1em"}}
  [:div [:label label]]
  [:div [:span [:strong value]]]])

(defn HeadingTitle [title] 
  [:h3 {:style {:margin "0.5em 0 0.25em"}} title])

(defn Sidebar []
 (let [contact-path [:cv :body :sidebar :contact] 
       education-path [:cv :body :content :education]]
   [:div
    [:div
     [HeadingTitle "Skills"]
     (into [:div] 
           (->> (db/get-in [:cv :body :sidebar :skills])
                (map (fn [skill] 
                       [:span {:style {:margin "3px"}
                               :className (rand-nth ["badge" "badge secondary" "badge success"])} skill]))))]
    [:div 
     [HeadingTitle "Tool Belt"] 
     (into [:div] 
           (->> (db/get-in [:cv :body :sidebar :technologies]) 
                (map (fn [tool] [:span {:style {:margin "3px"} 
                                        :className "badge"} tool]))))]
    [:div 
     [HeadingTitle "Languages"] 
     (into [:div] 
           (->> (db/get-in [:cv :body :sidebar :languages])
                (map (fn [lang-map] 
                       [:div {:style {:margin "0 0 10px"}}
                        [:span (get lang-map :language)
                         [:div {:style {:padding "5px 10px 3px"
                                        :color "white"
                                        :backgroundColor "#86a361"
                                        :width (str (* 100 (/ (get lang-map :expertise) 5)) "%")}}
                          (str (get lang-map :expertise) " / 5")]]]))))] 
    [:div 
     [HeadingTitle "Formal Education"]
     [SidebarContent "Degree" (db/get-in (conj education-path :degree))]
     [SidebarContent "School" (db/get-in (conj education-path :school))]
     [SidebarContent "Year" (db/get-in (conj education-path :year))] 
     [SidebarContent "GPA" (db/get-in (conj education-path :GPA))]]
    [:div
     [HeadingTitle "Contacts"]
     [SidebarContent "Email" (db/get-in (conj contact-path :email))]
     [SidebarContent "Phone" (db/get-in (conj contact-path :phone))]
     [SidebarContent "Address" (db/get-in (conj contact-path :address))]
     [SidebarContent "Linkedin" (db/get-in (conj contact-path :linkedIn))]
     [SidebarContent "Github" (db/get-in (conj contact-path :github))]
     [SidebarContent "Medium" (db/get-in (conj contact-path :medium))]
     [SidebarContent "Twitter" (db/get-in (conj contact-path :twitter))]
     [SidebarContent "Instagram" (db/get-in (conj contact-path :instagram))]
     [SidebarContent "Blog" (db/get-in (conj contact-path :website))]]]))

(defn ExperienceTable [data] 
  [:table {:style {:backgroundColor "#e49696"
                   :margin "0 0 0.75em"}}
   [:thead 
    [:tr 
     [:th "#"] 
     [:th [:h4 {:style {:margin 0}} (:year data)]]]]
   (let [jobTitle (:jobTitle data)
         company (:company data)
         description (:description data)
         experiences (:experiences data)
         tasks (:tasks data)
         images (:images data)]
     [:tbody
      (when jobTitle
        [:tr
         [:td "Job Title"]
         [:td jobTitle]])
      (when company
        [:tr
         [:td "Company"]
         [:td company]]) 
      (when description 
        [:tr 
         [:td "Responsibility"] 
         [:td description]]) 
      (when tasks 
        [:tr 
         [:td "Tasks"] 
         [:td (into [:ol] 
                    (map (fn [task] [:li task]) tasks))]])
      (when experiences 
        [:tr 
         [:td "Experiences"] 
         [:td (if (> (count experiences) 1)
                (into [:ol] 
                      (map (fn [e] [:li e]) experiences))
                [:span (first experiences)])]])])])

(defn Content [] 
  [:div 
   [HeadingTitle "Experiences"] 
   (into [:div]
         (->> (db/get-in [:cv :body :content :experience])
              (map ExperienceTable)))])

(defn Body []
 [:div.row
  [:div.col-4.col [Sidebar]]
  [:div.col-8.col [Content]]])

(defn print-cv [] 
  (let [print-area (.getElementById js/document "paper") 
        print-html (when print-area (.-innerHTML print-area))] 
    ;; (js/console.log print-html) 
    (when print-html 
      (js/console.log (.-frames js/window))
      (set! (-> (.-frames js/window)
                .-document .-title) "Nadiar AS's CV") 
      (set! (-> (.-frames js/window)
                .-document .-body .-innerHTML) print-html) 
      (-> (.-frames js/window)
          .-window .focus) 
      #_(-> (.-frames js/window)
          .-window .print))))

(defn download-cv [] 
  (let [a (.createElement js/document "a") 
        _ (set! (.-href a) "https://github.com/codxse/my-cv/raw/master/NadiarAS_CV.pdf")
        _ (set! (.-download a) "NadiarAS_CV.pdf")
        _ (set! (.-style a) "display: none")] 
    (.dispatchEvent a (js/MouseEvent. "click"))))

(defn main-panel []
  
  (r/create-class 
   {:reagent-render 
    (fn []
      (let [name (re-frame/subscribe [::subs/name])]
        [:div
         [:div.top-outer 
          {:style {:text-align "right"}} 
          [:button.btn-secondary
           {:onClick print-cv}
           "Fullscreen"] 
          [:button.btn-success
           {:style {:margin "0 0 0 10px"} 
            :onClick download-cv}
           "Download"]]
         (if (db/get-in [:ajax :fetch-json-cv :loading]) 
           [:div#paper 
            [:div {:style {:text-align "center"}} 
             [:h1 "Loading..."]]]
           [:div#paper
            [Header]
            [Body]])
     ;; [:pre
     ;;  (with-out-str (cljs.pprint/pprint @re-frame.db/app-db))]
         ]))}))
