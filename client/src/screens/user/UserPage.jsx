import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserData, resetData } from '../../redux/slice';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import DatePickerCustom from '../components/DatePicker';
import dayjs from 'dayjs';


const UserPage = () => {
    const data = useSelector((state) => state.data.data);

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    const [isAddConfirmDataOpen, setAddConfirmDataOpen] = useState(true);
    const [isEditedRowOpen, setisEditedRowOpen] = useState(-1);
    const [isloading, setIsloading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()))
    const initialAddData = {
        title: "",
        description: "",
    }
    const [addData, setAddData] = useState(initialAddData);
    const [editData, setEditData] = useState(initialAddData);
    const isSelectedDateTodaysDate = dayjs(selectedDate).format("DD/MM/YYYY") === dayjs(new Date()).format("DD/MM/YYYY")

    //-----------------------handle input data--------------------------------
    const handleSetAddData = (e) => {
        const newValue = e.target.value
        const name = e.target.name
        setAddData({ ...addData, [name]: newValue });
    }
    const handleSetEditData = (e) => {
        const newValue = e.target.value
        const name = e.target.name
        setEditData({ ...editData, [name]: newValue });
    }

    //-----------------------handle user table data  data--------------------------------
    const getTodayData = async (date) => {
        setIsloading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/data/getdata`, {
                method: "POST",
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail, date: date ?? dayjs().format("DD/MM/YYYY"), }),
            }
            );

            const json = await response.json();
            if (json.success) {
                const data = json.data
                dispatch(getUserData(data));
            } else {
                toast.error(json?.errorMsg);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }finally{
            setIsloading(false)
        }
    };
    const handleAddData = async () => {
        if(!addData.title && !addData.description){
            toast.error("Please add title")
            return
        }
        setIsloading(true)
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/data/adduserdata`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: userEmail, 
                ...addData,
                date:dayjs().format("DD/MM/YYYY"),
                // time : dayjs().format("HH:mm:ss")
             })
        });
        setAddData(initialAddData);
        const json = await response.json();
        if (json.success) {
            toast.success("Task added successfully")
            getTodayData();
        }
        else {
            toast.error(json?.errorMsg || "Something went wrong!");
        }
    }
    const handleEditData = async (id) => {
        if(!editData.title && !editData.description){
            toast.error("Please add title")
            return
        }
        setIsloading(true)
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/data/updateuserdata`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, ...editData })
        });
        const json = await response.json();
        if (json.success) {
            toast.success("Task edited successfully")
            getTodayData();
        }
        else {
            toast.error(json?.errorMsg || "Something went wrong!");
        }
    }
    const deleteData = async (id) => {
        setIsloading(true)
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/data/deleteuserdata`, {
            method: 'POST',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        const json = await response.json();
        if (json.success) {
            toast.success("Task deleted successfully")
            getTodayData();
        }
        else {
            toast.error(json?.errorMsg || "Something went wrong!");
        }
    }

    //--------------------handle task status change----------------------
    const handleTaskStatusChange = async(checked, taskId) => {
        setIsloading(true)
        // if(!checked) return

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/data/edittaskstatus`,
          {
            method: "POST",
            headers: {
              "auth-token": token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              taskId: taskId,
              completed: checked,
              date: dayjs().format("DD/MM/YYYY"),
              time: checked ? dayjs().format("HH:mm:ss") : null,
            }),
          }
        );
        const json = await response.json();
        if (json.success) {
            toast.success("Task status updated successfully")
            getTodayData();
        }
        else {
            toast.error(json?.errorMsg || "Something went wrong!");
        }

    }

    //------------------handle selected date change-------------------
    const handleDateTaskChange = async(date) => {
       await getTodayData(dayjs(date).format("DD/MM/YYYY"))
       setSelectedDate(dayjs(date))
    }

    //---------------handle edit click-----------------------
    const handleEditClick = (index, title, description) => {
        setisEditedRowOpen(index)
        setEditData({
            ...editData,
            title: title,
            description: description
        })
    }

    useEffect(() => {
      getTodayData();
    }, []);

    return (
        <div className='userpage'>
            <NavBar />
            <div className='mt-3' style={{marginLeft: '5vw'}}>
                <DatePickerCustom
                  placeHolder={"Select day"}
                  onChange={handleDateTaskChange}
                  value={selectedDate}
                />
            </div>
            <table style={{ width: "90vw", marginLeft: "5vw", marginTop: "", tableLayout: "fixed" }} className="table mt-3">
                <thead className="thead-dark">
                    <tr>
                        <th style={{ width: "10%", textAlign: 'center' }} scope="col">#</th>
                        <th style={{ width: "60%", textAlign: 'center' }} scope="col">Tasks</th>
                        <th style={{ width: "10%", textAlign: 'center' }} scope="col">Status</th>
                        <th style={{ width: "20%", textAlign: 'center' }} scope="col">Button</th>
                    </tr>
                </thead>
                <tbody>
                    {data && !isloading ?
                        data.map((e, i) => (
                            <tr key={e.id}>
                                <th style={{ width: "10%", textAlign: 'center' }} scope="row">{i + 1}</th>
                                <td style={{ width: "60%" }}>
                                    {isEditedRowOpen === i ? (
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                            <input value={editData.title} name='title' placeholder='Enter task...' onChange={handleSetEditData} style={{ width: "100%", borderRadius: "10px", paddingLeft: "15px", paddingRight: "15px" }} type='text' />
                                            <input value={editData.description} name='description' placeholder='Enter description...' onChange={handleSetEditData} style={{ width: "100%", borderRadius: "10px", paddingLeft: "15px", paddingRight: "15px", marginTop: "10px" }} type='text' />
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: '100%' }}>
                                            <p style={{ margin: 0, padding: 0, fontSize: "18px", fontWeight: "600", wordWrap: "break-word", wordBreak: "break-all", width: '100%' }}>{e.title}</p>
                                            <p style={{ fontSize: "14px", width: '100%', wordWrap: "break-word", wordBreak: "break-all" }} className='mt-1'>{e.description}</p>
                                        </div>
                                    )}
                                </td>
                                <td style={{ width: "10%", textAlign: "center", verticalAlign: 'middle' }}>
                                    <input disabled={!isSelectedDateTodaysDate} checked={e.completions.completed} onChange={(check)=> handleTaskStatusChange(check.target.checked, e.id)} type="checkbox" style={{ width: "20px", height: "20px" }} />
                                </td>

                                <td style={{ width: "20%", textAlign: "center" }}>
                                    {isEditedRowOpen === i ? (
                                        <button className='btn btn-primary mx-2 my-2' onClick={() => { handleEditData(e.id); setisEditedRowOpen(-1) }}>Submit</button>
                                    ) : (
                                        <button disabled={!isSelectedDateTodaysDate || !isAddConfirmDataOpen} onClick={() => handleEditClick(i, e.title, e.description)} className='btn btn-success mx-2 my-2'>Edit</button>
                                    )}
                                    {isEditedRowOpen === i ? (
                                        <button className='btn btn-danger' onClick={() => { setEditData(initialAddData); setisEditedRowOpen(-1) }}>Cancel</button>
                                    ) : (
                                        <button onClick={() => deleteData(e.id)} disabled={!isSelectedDateTodaysDate || !isAddConfirmDataOpen} className='btn btn-danger'>Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))
                        :
                        <Loading />
                    }
                </tbody>
            </table>

            {!isAddConfirmDataOpen &&
                <div style={{ minHeight: "10vh", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                    <input placeholder='Enter task...' onChange={handleSetAddData} name="title" style={{ width: "60vw", borderRadius: "20px", paddingLeft: "15px", paddingRight: "15px", marginLeft: "18.5vw" }} type='text' />
                    <input placeholder='Enter description...' onChange={handleSetAddData} name="description" style={{ width: "60vw", borderRadius: "20px", paddingLeft: "15px", paddingRight: "15px", marginLeft: "18.5vw" }} type='text' />
                </div>

            }
            {isAddConfirmDataOpen ? (
                <button disabled={!isSelectedDateTodaysDate || isEditedRowOpen >= 0} onClick={() => setAddConfirmDataOpen(!isAddConfirmDataOpen)} style={{ width: "90vw", marginLeft: "5vw" }} className='btn btn-primary mt-1'>Add Task</button>
            ) : (
                <button onClick={() => { handleAddData(); setAddConfirmDataOpen(!isAddConfirmDataOpen) }} style={{ width: "90vw", marginLeft: "5vw" }} className='btn btn-success mt-2'>Confirm Add Data</button>

            )}
            {!isAddConfirmDataOpen &&
                <button onClick={() => { setAddData(initialAddData); setAddConfirmDataOpen(!isAddConfirmDataOpen) }} style={{ width: "90vw", marginLeft: "5vw" }} className='btn btn-primary mt-2'>Cancel</button>
            }

        </div>
    );
};

export default UserPage;
