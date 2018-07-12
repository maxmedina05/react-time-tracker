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
      response = await response.json();
    }
  } catch (e) {}
}

async function updateTimelog(timelog) {
  try {
    let response = await fetch(`${BASE_API_ENDPOINT}/${timelog._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timelog)
    });

    if (response.ok) {
      response = await response.json();
    }
  } catch (e) {}
}

async function deleteTimelog(timelog) {
  try {
    let response = await fetch(`${BASE_API_ENDPOINT}/${timelog._id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      return response;
    }
  } catch (e) {}
}

async function getTimelogs(q = '') {
  try {
    let response = await fetch(`${BASE_API_ENDPOINT}/group?term=${q}`, {
      headers: {
        Accept: 'application/json; charset=utf-8'
      }
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {}
}

const TimelogService = {
  addTimelog,
  deleteTimelog,
  updateTimelog,
  getTimelogs
};

export default TimelogService;
