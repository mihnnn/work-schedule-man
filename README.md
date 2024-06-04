# Work Schedule Manager Web App

# How to run:
- Clone this repository
- Install modules, because it is ignored by git when updloaded
- Run server with npm run server in the ROOT folder
- Run client: cd to /front-end and npm run dev, to run a developer build

# Progress:
- Authentication Functionality
- Home Page, App UI, (not completed)
- Google Calendar Integration (not yet)

# Todo:
- [x] Home page have navbar and login
- [x] Check login status
  - If not logged in, button will be "SIGN UP"
  - If logged in, button will be "GO TO APP" and route to app
- [x] Design app UI - semi check
- [x] Implement login
- [x] Implement user already exists check in the backend
- [x] When registered, stay in logged-in state and direct to home page
  - "SIGN UP" button becomes "GO TO APP"
- [x] Logout button kills session and redirects to the home page
  - "SIGN UP" button instead of "GO TO APP"
- [x] Each `<WsmItem>` routes the app content to a new route (e.g., `/app/bookings`)
- [x] Within `/app-comp/AppContent.jsx`
  - Create new other app content files like `EventTypes.jsx` or `Bookings.jsx`
  - Create them as components to put in `AppContent.jsx`
- [x] Make clicking on the EventRoutes route the page, not only the Text
- [x] From added AuthContext, adjust from the `App.jsx`
  - Check for user, if `authUser` then "SIGN UP" button becomes "GO TO APP"
  - Home text is different, something like "Welcome {username}"
  - "GET STARTED" routes to app if logged in which routes to `/app/event-types`
- [x] Query in the event-types:
  - `?dialog=new&eventPage=username` - ongoing
  - Shows a modal
- [x] Create event successfully shows a toast - **today**
- [x] Booking UI - may bring the skeleton from event-types
  - May split into title, nav, content
- [x] Add description in the event
- [ ] Availability UI
- [ ] `/getting-started/` route:
  - Name
  - Username
  - Calendar connection
  - Setup availability
  - Add profile pic
  - Profile description
- [ ] Interaction between 2 users:
  - When an event is confirmed between 2 users, one will be a host
  - Said event will show up in both users' booking/upcoming route
- [ ] When clicking on the event to edit, in the URL:
  - Have query for each edit tab - 
- [ ] Create event and see it in the upcoming if it is confirmed to book, and if the time hasn't passed
- [x] GET and POST event endpoint
- [ ] After creating event:
  - Direct to an edit event page
  - When clicking copy link on the event link in the get event-list, get a link
  - The event link will be a tab that shows the calendar: how to book the event
- [x] Make sidebar not scrollable
- [x] Implement delete event
- [ ] Implement the "booking function"
  - When you click on event, it shows the date and calendar etc. that takes into account of your availability time
  - Shows "a list" of the hours to choose to book
  - The event-link that you copied (second button in the event-item)
    - Once confirmed it will show in the upcoming
    - Mail will be sent for a reminder
    - Once past the date booked, it will end up in the Past
    - Canceled event will end up in Canceled
- [ ] Profile-link (public page) and the button to copy it
  - In sidebar, above logout
- [ ] Hide logout button to the profile options
- [ ] Make createEvent refetch the eventlist to update it instantly ( dk if i will need, bc when event created, user directed to edit event page)
- [ ] make duration default to 15, but changable
- [ ] URL changes when we input title: 
      - e.g: title is "new chat"
	    - url becomes: (prefix) + new-chat 

- [ ] split the EventTypes.jsx component to modules
- [ ] try to implement animation for creating-deleting event
- [ ] make event url unique in db (for each user)
- [ ] Make Edit Event UI: Navbar + sidebar + content,
      default route: /event-types/id?tabName=setup
      -each sidebar tab when active will display in the query param, when change active tab also changes query param
- [ ] Make the get event by id route, and add query params tabName={tab_name} 
- [ ] change URL when clicking EventItem to edit the event
- [ ] change the buttons in  the EventItem to do their thing

Bug: checked = fixed
- [x] When clicking continue when create event, if box is empty, it proceeded to close the modal, but query params is still there, when you refresh the page, query param is still there and modal box open
- [x] Event still not refetched after creating 
- [x] default value of duration doesnt register as actual duration ``value={duration || 15}``
- [ ] dropdown menu of delete button in event-types still buggy
- [ ] Profile dropdown same problem with delete dropdown
- [ ] When logging in/out, bg video ignore mute and plays audio??? but when refresh, no more audio 