import React from 'react'
import Head from 'next/head';

import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';
import NewsletterRegistration from '../components/input/newsletter-registration';

const HomePage = (props) => {

  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="we need to write some relevent description for the search engine crawlers"
        />
      </Head>
      <NewsletterRegistration/>
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps() {

  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage
