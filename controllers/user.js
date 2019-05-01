import UserService from '../services/UserService';

export default {
  async getCurrentUser(req, res, next) {
    const { token } = req;
  
    try {
      var user = await UserService.getUserByToken(token);
    } catch ({ message }) {
      return next({
        status: 500,
        message
      })
    }

    return res.json(user);
  }
}