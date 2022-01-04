import React, { Fragment, useEffect, useState } from 'react'
import ErrorAlert from '../../components/error-alert/error-alert';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/results-title/results-title';
import Button from '../../components/ui/button';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const FilteredEventsPage = () => {

    // const { events, hasError, date } = props;
    const router = useRouter();
    const [filterEvents, setFilterEvents] = useState([]);
    const filteredData = router.query.slug;

    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR('https://next-events-abc-default-rtdb.firebaseio.com/events.json', fetcher);

    useEffect(() => {
        if (data) {
            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key],
                })
            }
            setFilterEvents(events);
        }
    }, [data])

    if (!filterEvents) {
        return <div className="center">LOADING....</div>
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p className="center">Invalid filter! Please adjust your values.</p>
                    <div className="center mt-20">
                        <Button link='/events'>Show All Events</Button>
                    </div>
                </ErrorAlert>
            </Fragment>
        );
    }


    let filteredEvents = filterEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

    if (!filteredEvents || filteredEvents?.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p className="center">No events found for the choosen filter</p>
                    <div className="center mt-20">
                        <Button link='/events'>Show All Events</Button>
                    </div>
                </ErrorAlert>
            </Fragment>
        );
    }

    const exDate = new Date(numYear, numMonth - 1);

    return (
        <div>
            <Fragment>
                <ResultsTitle date={exDate} />
                <EventList items={filteredEvents} />
            </Fragment>
        </div>
    )
}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filteredData = params.slug;

//     const filteredYear = filteredData[0];
//     const filteredMonth = filteredData[1];
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//         return {
//             props: { hasError: true }
//             // notFound:true,
//             // redirect:{
//             //     destination:'/error'
//             // }
//         }
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth,
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }

// }


export default FilteredEventsPage
