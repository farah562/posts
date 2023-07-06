import React from "react";
import "./AdminHomePage.css";

import { useHttpClient } from "../../../hooks/http-hook";

import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import DataTable from "../../../components/DataTable/DataTable";

export default function AdminHomePage({
  posts, 
  fetchPosts,
  users,
  fetchUsers
}) {

  const { sendRequest } = useHttpClient();

  const deleteUser = async (userId) => {
    try {
      let responseData = await sendRequest(
        `http://localhost:3500/admin/delete-user/${userId}`,
        "DELETE"
      );

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };


  const deletePost = async (postId) => {
    try {
      let responseData = await sendRequest(
        `http://localhost:3500/admin/delete-post/${postId}`,
        "DELETE"
      );

      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmPost = async (postId) => {
    try {
      let responseData = await sendRequest(
        `http://localhost:3500/admin/confirm-post/${postId}`,
        "PATCH"
      );

      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user_name",
      headerName: "Username",
      width: 120,
    },
    {
      field: "title",
      headerName: "Post Title",
      width: 120,
    },
    {
      field: "description",
      headerName: "Post Description",
      width: 200,
    },
    {
      field: "likes",
      headerName: "Likes",
      width: 90,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <IconButton onClick={() => deletePost(params.row.id)}>
            <DeleteOutlineIcon sx={{ color: "red" }} />
          </IconButton>
         {params.row.status !== 'confirmed' && <IconButton onClick={() => confirmPost(params.row.id)}>
          <CheckCircleIcon sx={{ color: "green" }} />
        </IconButton>}
        </>
        );
      },
    },
  ];

  const usersColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user_name",
      headerName: "Username",
      width: 120,
    },
    {
      field: "user_email",
      headerName: "Email",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => deleteUser(params.row.id)}>
            <DeleteOutlineIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className="admin-homepage__container">
      <div className="home-page__items">
        <div className="home-page__item">
          <div className="header">
            <i className="bx bx-user me-1 mb-0"></i>
            <h6 className="fw-bold">Number of Posts</h6>
          </div>
          <h1 className="w-100 text-center">{posts?.length}</h1>
        </div>
        <div className="home-page__item">
          <div className="header">
            <i className="bx bx-store-alt me-1"></i>
            <h6 className="fw-bold">Number of users</h6>
          </div>
          <h1 className="w-100 text-center">{users?.length}</h1>
        </div>
      </div>
      <div className="row w-100 mt-4">
        <div className="col-xs-12">
          <div className="table-header mb-3">
            <h5 className="fw-bold">Posts List</h5>
          </div>
          <DataTable data={posts} fetchData={fetchPosts} cols={columns} />
        </div>
      </div>
      {/* <div className="col-xs-12 col-lg-6">
          <div className="table-header mb-3">
            <h5 className="fw-bold">Users List</h5>
          </div>
          <DataTable data={users} fetchData={fetchUsers} />
        </div> */}
      <div className="row w-100">
      
        <div className="col-xs-12">
          <div className="table-header mb-3">
            <h5 className="fw-bold">Users List</h5>
          </div>
          <DataTable data={users} fetchData={fetchUsers} cols={usersColumns} />
        </div>
      </div>
    </div>
  );
}
