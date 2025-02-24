import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';
import Message from '../../Message';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import { deleteUser, getUsers } from '../../../actions/userAction';

const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


    const deleteHandler = (id) => {
      if (window.confirm('Are you sure you want to delete?')) {
        dispatch(deleteUser(id))
          .then(() => {
            dispatch(getUsers());
            toast.success('Product deleted successfully!');
          })
          .catch((err) => {
            console.log('Delete product error:', err);
            toast.error('Error deleting product.');
          });
      }
    };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name || 'No Name'}</td>
                <td><a href={`mailto:${user.email}`}>{ user.email }</a></td>
                <td>{user.role}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
