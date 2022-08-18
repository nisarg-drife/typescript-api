import { userDocument, userModel } from "../schema/user.schema";

class UserService {
  hello() {
    return {
      msg: "User Hello!!",
    };
  }

  async createUser(name: string, age: number) {
    const user_id = (await userModel.countDocuments()) + 1;
    userModel.create({
      user_id,
      name,
      age,
    });
    return {
      msg: "Create User",
      user: {
        user_id,
        name,
        age,
      },
    };
  }

  async getUser(user_id?: number) {
    let user_list:userDocument[] = [];
    if (!user_id) {
      user_list = await userModel.find();
    } else {
      const user = await userModel.findOne({ user_id });
      user_list.push(user);
    }
    return {
      msg: "Get User",
      users: user_list.map((user) => {
        return {
          user_id: user?.user_id,
          name: user?.name,
          age: user?.age,
        };
      }),
    };
  }

  async updateUser(user_id: number, name?: string, age?: number) {
    await userModel.updateOne({ user_id }, {
      name,
      age
    });
    return {
      msg: "Update User",
      user_id,
      update: {
        name,
        age,
      },
    };
  }

  async deleteUser(user_id: number) {
    await userModel.deleteOne({ user_id });
    return {
      msg: "Delete User",
      user_id,
    };
  }
}

export const userService = new UserService();
