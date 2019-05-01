import User from '../models/user';

export default {
  async getUserByToken(token) {
    const { _id } = token;

    try {
      var user = await User.findOne({ _id }, { password: 0 });
    } catch (error) {
      throw error;
    }

    return user;
  }
}