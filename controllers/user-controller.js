const { UserModel, BodyModel } = require("../models")

exports.getAllUsers = async (request, response) => {
    const users = await UserModel.find();
    if (users.length === 0) {
        return response.status(404).json({
            success: false,
            message: "No user found"
        })
    }

    response.status(200).json({
        success: true,
        data: users
    })
}

exports.getUserById = async (request, response) => {
    const { id } = request.params;

    const user = await UserModel.findById({ _id: id });

    if (!user) {
        return response.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return response.status(200).json({
        success: true,
        data: user,
    });
};


exports.addNewUser = async (request, response) => {
    const { data } = request.body
    const newUser = await UserModel.create(data)


    return response.status(200).json({
        success: true,
        message: "User created successfully",
        data: newUser
    })
}

exports.updateUserById = async (request, response) => {
    const { id } = request.params
    const { data } = request.body
    const updatedUserData = await UserModel.findOneAndUpdate(
        {
            _id: id,
        },
        {
            $set: {
                ...data,
            },
        },
        {
            new: true,
        }
    );
    if (!updatedUserData) {
        return response.status(404).json({
            success: false,
            message: "User not found"
        })
    }


    return response.status(200).json({
        success: true,
        message: "User's details updated successfully",
        updatedUserData
    })
}


exports.deleteUser = async (request, response) => {
    const { id } = request.params;
    const user = await UserModel.deleteOne({ _id: id })
    if (!user) {
        return response.status(404).json({
            success: false,
            message: "User which need to be deleted does not exist"
        })
    }


    return response.status(202).json({
        success: true,
        message: "User deleted successfully"
    })
}

exports.getUserSubscriptionDetail = async (request, response) => {
    const { id } = request.params;

    const user = await UserModel.findById(id);
  
    if (!user)
      return response.status(404).json({
        success: false,
        message: "User not found",
      });
  
    const getDateInDays = (data = "") => {
      let date;
      if (data === "") {
        // current date
        date = new Date();
      } else {
        // getting date on bacis of data variable
        date = new Date(data);
      }
      let days = Math.floor(date / (1000 * 60 * 60 * 24));
      return days;
    };
  
    const subscriptionType = (date) => {
      if (user.subscriptionType === "Basic") {
        date = date + 90;
      } else if (user.subscriptionType === "Standard") {
        date = date + 180;
      } else if (user.subscriptionType === "Premium") {
        date = date + 365;
      }
      return date;
    };
  
    // Subscription expiration calculation
    // January 1, 1970, UTC. // milliseconds
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);
  
    console.log("Return Date ", returnDate);
    console.log("Current Date ", currentDate);
    console.log("Subscription Date ", subscriptionDate);
    console.log("Subscription expiry date", subscriptionExpiration);
  
    const data = {
      ...user._doc,
      subscriptionExpired: subscriptionExpiration < currentDate,
      daysLeftForExpiration:
        subscriptionExpiration <= currentDate
          ? 0
          : subscriptionExpiration - currentDate,
      fine:
        returnDate < currentDate
          ? subscriptionExpiration <= currentDate
            ? 200
            : 100
          : 0,
    };
  
    response.status(200).json({
      success: true,
      data,
    });
}
