import db from "../db/db.js";

export const getData = async (req, res) => {
  let success = false;
  if (!req.body.email) {
    return res.status(400).send({ success, errorMsg: "Server error" });
  }
  try {
    const tasks = await db.task.findMany({
      where: {
        user: {
          email: req.body.email,
        },
      },
      include: {
        completions: {
          where: {
            date: req.body.date,
          },
          select: {
            completed: true,
            dateTime: true,
            date: true,
            time: true,
            taskId: true
          },
        },
      },
      // select:{
      //   title: true,
      //   completions: {
      //     select: {
      //       completed: true
      //     }
      //   }
      // }
    });
    if (tasks) {
      success = true;
      // console.log(tasks[0], req.body.date)
      let taskNew = tasks.map((data) => {
        let temp ={
          ...data,
          completions: data.completions[0] || {},
        }
        // delete temp.completions
        // console.log(temp)
        return temp
      });

      return res.status(200).json({ success, data: taskNew });
    } else {
      return res.status(500).send({ success, errorMsg: "Server error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success, errorMsg: "Server error" });
  }
};

export const addData = async (req, res) => {
  let success = false;
  if (!req.body.email) {
    return res.status(400).send({ success, errorMsg: "Server error" });
  }
  try {
    const task = await db.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        user: {
          connect: { email: req.body.email },
        },
        completions: {
          create: {
            date: req.body.date,
            // time: req.body.time,
            completed: false,
          },
        },
      },
    });
    if (task) {
      success = true;
      return res.status(200).json({ success, data: task });
    } else {
      return res.status(500).send({ success, errorMsg: "Server error" });
    }
  } catch (error) {
    return res.status(500).send({ success, errorMsg: "Server error" });
  }
};

export const updateUserData = async (req, res) => {
  let success = false;
  if (!req.body.id) {
    return res.status(400).send({ success, errorMsg: "Server error" });
  }
  try {
    const updatedTask = await db.task.update({
      where: { id: req.body.id },
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });

    if (updatedTask) {
      success = true;
      return res.status(200).json({ success, data: updatedTask });
    } else {
      return res.status(500).send({ success, errorMsg: "Server error" });
    }
  } catch (error) {
    return res.status(500).send({ success, errorMsg: "Server error" });
  }
};

export const deleteUserData = async (req, res) => {
  let success = false;
  if (!req.body.id) {
    return res.status(400).send({ success, errorMsg: "Server error" });
  }
  try {
    const deletedTask = await db.task.delete({
      where: {
        id: req.body.id,
      },
    });

    if (deletedTask) {
      success = true;
      return res.status(200).json({ success });
    } else {
      return res.status(500).send({ success, errorMsg: "Server error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success, errorMsg: "Server error" });
  }
};

export const editTaskStatus = async (req, res) => {
  let success = false;
  if (!req.body.taskId) {
    return res.status(400).send({ success, errorMsg: "Server error" });
  }
  // console.log(updatedTask)
  try {
    const updatedTask = await db.taskCompletion.upsert({
      where: {
        taskId_date: {
          taskId: req.body.taskId,
          date: req.body.date,
        },
      },
      update: {
        completed: req.body.completed,  
        time: req.body.time,      
      },
      create: {
        taskId: req.body.taskId,
        date: req.body.date,
        completed: req.body.completed,  
        time: req.body.time,            
      },
    });
    
    if (updatedTask) {
      success = true;
      return res.status(200).json({ success });
    } else {
      return res.status(500).send({ success, errorMsg: "Server error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success, errorMsg: "Server error" });
  }
};
