const BASE_API_ENDPOINT = 'api/v1/timelogs';

async function addTimelog(timelog) {
  try {
    let response = await fetch(BASE_API_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timelog)
    });

    if (response.ok) {
      response = response.json();
      console.log(response);
    }
  } catch (e) {}
}

async function getTimelogs() {}

const TimelogService = {
  addTimelog
};

export default TimelogService;
