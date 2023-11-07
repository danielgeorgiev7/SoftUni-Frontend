import { useState, useEffect } from "react";
import * as userService from "../services/userService";
import UserListItem from "./UserListItem";
import NoUsersYet from "./NoUsersYet";
import UserInfoModal from "./UserInfoModal";
import UserDeleteModal from "./UserDeleteModal";
import CreateUserModal from "./CreateUserModal";
function UserListTable() {
  const [users, setUsers] = useState([]);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  document.addEventListener("keydown", escapeKeyDown);

  function escapeKeyDown(e) {
    if (e.key === "Escape") {
      setIsOpenDeleteModal(false);
      setIsOpenCreateModal(false);
      setIsOpenInfoModal(false);
    }
  }

  useEffect(() => {
    userService
      .getAll()
      .then((result) => setUsers(result))
      .catch((err) => console.log(err));
  }, []);

  function infoModalClickHandler(id) {
    setIsOpenInfoModal(true);
    setCurrentUser(id);
  }

  function deleteModalClickHandler(id) {
    setIsOpenDeleteModal(true);
    setCurrentUser(id);
  }

  function createModalClickHandler() {
    setIsOpenCreateModal(true);
  }

  function onDeleteHandler() {
    setIsOpenDeleteModal(false);
    setUsers(() => users.filter((user) => user._id !== currentUser));
    userService.remove(currentUser);
  }

  async function onCreateHandler(e) {
    e.preventDefault();

    setIsOpenCreateModal(false);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.imageUrl === "")
      data.imageUrl =
        "https://cdn3.vectorstock.com/i/1000x1000/54/17/person-gray--placeholder-man-vector-24005417.jpg";

    const response = await userService.create(data);
    setUsers((users) => [...users, response]);
  }

  function infoModalCloseHandler() {
    setIsOpenInfoModal(false);
  }

  function deleteModalCloseHandler() {
    setIsOpenDeleteModal(false);
  }

  function createModalCloseHandler() {
    setIsOpenCreateModal(false);
  }

  if (users.length === 0) return <NoUsersYet />;

  return (
    <div className="table-wrapper">
      {isOpenCreateModal && (
        <CreateUserModal
          onClose={createModalCloseHandler}
          onCreate={onCreateHandler}
        />
      )}

      {isOpenDeleteModal && (
        <UserDeleteModal
          onClose={deleteModalCloseHandler}
          onDelete={onDeleteHandler}
        />
      )}

      {isOpenInfoModal && (
        <UserInfoModal userId={currentUser} onClose={infoModalCloseHandler} />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>
              First name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Last name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Email
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Phone
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Created
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserListItem
              key={user._id}
              userId={user._id}
              createdAt={user.createdAt}
              email={user.email}
              firstName={user.firstName}
              imageUrl={user.imageUrl}
              lastName={user.lastName}
              phoneNumber={user.phoneNumber}
              infoModalClickHandler={infoModalClickHandler}
              deleteModalClickHandler={deleteModalClickHandler}
            />
          ))}
        </tbody>
      </table>
      <button className="btn-add btn" onClick={createModalClickHandler}>
        Add new user
      </button>
    </div>
  );
}

export default UserListTable;
