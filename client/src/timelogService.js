const BASE_API_ENDPOINT = 'api/v1/timelogs';

async function addTimelog(timelog) {
  let response = await fetch(BASE_API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(timelog)
  });

  response = await response.json();
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response;
}

async function updateTimelog(timelog) {
  let response = await fetch(`${BASE_API_ENDPOINT}/${timelog._id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(timelog)
  });

  response = await response.json();
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response;
}

async function deleteTimelog(timelog) {
  let response = await fetch(`${BASE_API_ENDPOINT}/${timelog._id}`, {
    method: 'DELETE'
  });

  if (response.status === 204) {
    return true;
  }

  response = await response.json();
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
}

async function getTimelogs(q = '', page = 1) {
  let response = await fetch(
    `${BASE_API_ENDPOINT}/group?term=${q}&page=${page}`,
    {
      headers: {
        Accept: 'application/json; charset=utf-8'
      }
    }
  );
  response = await response.json();
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response;
}

const TimelogService = {
  addTimelog,
  deleteTimelog,
  updateTimelog,
  getTimelogs
};

export default TimelogService;
