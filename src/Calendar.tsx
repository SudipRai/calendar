import { useEffect, useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { findIana } from "windows-iana";
import { Event } from 'microsoft-graph';
import { getUserWeekCalendar } from './GraphService';
import { useAppContext } from './AppContext';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { add, format, getDay, parseISO } from 'date-fns';
import { endOfWeek, startOfWeek } from 'date-fns/esm';
import CalendarDayRow from './CalendarDayRow';
import './Calendar.css';


// // const {
// //   Client
// // } = require("@microsoft/microsoft-graph-client");
// // const {
// //   TokenCredentialAuthenticationProvider
// // } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
// // const {
// //   ClientSecretCredential
// // } = require("@azure/identity");

// // const credential = new ClientSecretCredential("f8cdef31-a31e-4b4a-93e4-5f571e91255a", "0061d205-dab4-4dfa-9327-27195d14ae84", "9Wg8Q~W6RngGzvbLr~TpR0tLYOlstq~YNmbspaHK");
// // const authProvider = new TokenCredentialAuthenticationProvider(credential, {
// //   scopes: ["user.read", "mail.send"]
// // });
// // console.log(authProvider);
// // const client = Client.initWithMiddleware({
// //   debugLogging: true,
// //   authProvider
// //   // Use the authProvider object to create the class.
// // });

// // let events = client.api('/me/events')
// // 	.header('Prefer','outlook.timezone="Pacific Standard Time"')
// // 	.select('subject,body,bodyPreview,organizer,attendees,start,end,location')
// // 	.get();

// // console.log(events)




// const {
//   PublicClientApplication,
//   InteractionType,
//   AccountInfo
// } = require("@azure/msal-browser");

// const {
//   AuthCodeMSALBrowserAuthenticationProvider,
//   AuthCodeMSALBrowserAuthenticationProviderOptions
// } = require("@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser");

// const options: AuthCodeMSALBrowserAuthenticationProviderOptions: {
//   account: account, // the AccountInfo instance to acquire the token for.
//   interactionType: InteractionType.PopUp, // msal-browser InteractionType
//   scopes: ["user.read", "mail.send"] // example of the scopes to be passed
// }

// // Pass the PublicClientApplication instance from step 2 to create AuthCodeMSALBrowserAuthenticationProvider instance
// const authProvider: new AuthCodeMSALBrowserAuthenticationProvider(publicClientApplication, options);



export default function Calendar() {
  const app = useAppContext();

  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    const loadEvents = async() => {
      if (app.user && !events) {
        try {
          const ianaTimeZones = findIana(app.user?.timeZone!);
          const events = await getUserWeekCalendar(app.authProvider!, ianaTimeZones[0].valueOf());
          setEvents(events);
        } catch (error ) {
            if(error instanceof Error){
                app.displayError!(error.message);
            }
        }
      }
    };

    loadEvents();
  });

  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(weekStart);
  
  return (
    <AuthenticatedTemplate>
      <div className="mb-3">
        <h1 className="mb-3">{format(weekStart, 'MMMM d, yyyy')} - {format(weekEnd, 'MMMM d, yyyy')}</h1>
        <RouterNavLink to="/newevent" className="btn btn-light btn-sm">New event</RouterNavLink>
      </div>
      <div className="calendar-week">
        <div className="table-responsive">
          { events && <Table size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <CalendarDayRow
                date={weekStart}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 0) } />
              <CalendarDayRow
                date={add(weekStart, { days: 1 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 1) } />
              <CalendarDayRow
                date={add(weekStart, { days: 2 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 2) } />
              <CalendarDayRow
                date={add(weekStart, { days: 3 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 3) } />
              <CalendarDayRow
                date={add(weekStart, { days: 4 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 4) } />
              <CalendarDayRow
                date={add(weekStart, { days: 5 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 5) } />
              <CalendarDayRow
                date={add(weekStart, { days: 6 })}
                timeFormat={app.user?.timeFormat!}
                events={events!.filter(event => getDay(parseISO(event.start?.dateTime!)) === 6) } />
            </tbody>
          </Table> }
        </div>
      </div>
    </AuthenticatedTemplate>
  );
}