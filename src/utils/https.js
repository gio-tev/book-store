export const signupUser = async (email, password, API_KEY) => {
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const authenticateUser = async (email, password, API_KEY) => {
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resetPassword = async (email, API_KEY) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email,
      }),
    }
  );
  const data = await res.json();
  return data;
};

export const saveUser = async newUser => {
  const res = await fetch(
    'https://book-store-ac9bf-default-rtdb.firebaseio.com/accounts.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newUser,
        image:
          'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=1000x750&vertical=top',
      }),
    }
  );
  const data = res.json();
  return data;
};

export const fetchAccounts = async () => {
  const response = await fetch(
    'https://book-store-ac9bf-default-rtdb.firebaseio.com/accounts.json'
  );

  const data = await response.json();

  const transformedAccounts = [];

  if (data) {
    for (const [key, value] of Object.entries(data)) {
      const transforemdAccount = {
        ...value,
        id: key,
      };
      transformedAccounts.push(transforemdAccount);
    }
  }

  return transformedAccounts;
};

export const fetchBooks = async () => {
  const response = await fetch(
    'https://book-store-ac9bf-default-rtdb.firebaseio.com/books.json'
  );

  const data = await response.json();

  const transformedBooks = [];
  for (const [key, value] of Object.entries(data)) {
    const transforemdBook = {
      ...value,
      id: key,
    };
    transformedBooks.push(transforemdBook);
  }

  return transformedBooks;
};
