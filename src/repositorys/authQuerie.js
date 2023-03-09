export const getEmailByEmail = () => {
    const query = `--sql
      SELECT
          email
      FROM
          users
      WHERE
          email = $1;             
  `
    return query
  }

  export const insertInUsers = () => {
    const query = `--sql
          INSERT INTO
              users ("username", "email", "password", "pictureUrl")
          VALUES
              ($1, $2, $3, $4);        
      `
    return query
  }
  
  export const getPasswordByEmail = () => {
    const query = `--sql
      SELECT
          "password"
      FROM
          users
      WHERE
          email = $1;
  `
    return query
  }
  
  export const getUserByEmail = () => {
    const query = `--sql
      SELECT
          *
      FROM
          users
      WHERE
          email = $1;             
  `
    return query
  }