import axios from "axios";

class ReferralAPI {
  constructor() {
    this.URL = "http://localhost:8080/referral";
    this.AUTHORIZATION = "Basic 123"; //should be in env
  }

  async create(data) {
    try {
      const response = await axios({
        method: "POST",
        url: `${this.URL}/create`,
        headers: {
          "Content-type": "application/json",
          authorization: this.AUTHORIZATION,
        },
        data,
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async get(id) {
    try {
      const response = await axios({
        method: "GET",
        url: `${this.URL}/get?id=${id}`,
        headers: {
          "Content-type": "application/json",
          authorization: this.AUTHORIZATION,
        },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getAll() {
    try {
      const response = await axios({
        method: "GET",
        url: `${this.URL}/getAll`,
        headers: {
          "Content-type": "application/json",
          authorization: this.AUTHORIZATION,
        },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async delete(id) {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${this.URL}/delete?id=${id}`,
        headers: {
          "Content-type": "application/json",
          authorization: this.AUTHORIZATION,
        },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(data) {
    try {
      const response = await axios({
        method: "PUT",
        url: `${this.URL}/update`,
        headers: {
          "Content-type": "application/json",
          authorization: this.AUTHORIZATION,
        },
        data,
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default ReferralAPI;
