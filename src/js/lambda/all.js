import getTorontoPoliceIncidents from './torontoPolice';

export async function handler(event, context) {
  try {
    const tpsIncidents = await getTorontoPoliceIncidents();
    return {
      statusCode: 200,
      body: JSON.stringify(tpsIncidents),
    };
  } catch (error) {
    console.log('Error', error);
    // Sentry.captureException(error);
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Lambda issue' }),
    };
  }
}
