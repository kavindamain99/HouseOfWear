import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import Meta from "../components/Meta";

const theme = createTheme({
  palette: {
    dark: {
      main: "#171717",
      contrastText: "#fff",
    },
  },
});

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography
          variant="h5"
          sx={{ fontFamily: "Playfair Display", textAlign: "center", my: 2 }}
        >
          ORDERS
        </Typography>

        <Meta title="Orders List" />

        {loading ? (
          <Loader />
        ) : error ? (
          <Alerts severity="error" message={error} />
        ) : (
          <TableContainer sx={{ my: 2 }} component={Paper}>
            <Table aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" color="text.secondary">
                    User
                  </TableCell>
                  <TableCell align="right" color="text.secondary">
                    DATE
                  </TableCell>
                  <TableCell align="right" color="text.secondary">
                    TOTAL
                  </TableCell>
                  {/* <TableCell align="right" color="text.secondary">
                    PAID
                  </TableCell> */}
                  <TableCell align="right" color="text.secondary">
                    DELIVERED
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      {order.user && order.user.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      title={order.createdAt.substring(0, 10)}
                    >
                      {order.createdAt.substring(5, 10)}
                    </TableCell>
                    <TableCell align="right">{order.totalPrice}</TableCell>
                    {/* <TableCell align="right">
                      {order.isPaid ? (
                        <CheckIcon color="success" />
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </TableCell> */}
                    <TableCell align="right">
                      {order.isDelivered ? (
                        <CheckIcon color="success" />
                      ) : (
                        <ClearIcon color="error" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Link
                        component={RouterLink}
                        underline="none"
                        to={`/order/${order._id}`}
                        sx={{
                          display: "block",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            ml: "auto",
                            display: "block",
                          }}
                          size="small"
                          color="dark"
                        >
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default OrderList;
