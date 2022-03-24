import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Favorite() {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState([1]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    function getdata() {
      const list = JSON.parse(localStorage.getItem("favitem"));
      setData(list);
    }
    getdata();
  }, []);
 
  return (
    <div>
      <Button
        variant="outlined"
        sx={{ margin: "10px" }}
        onClick={() => navigate("../")}
      >
        Go To Home
      </Button>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {data.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value._id}`;
          return (
            <ListItem key={value._id}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={`Profile`} src={value.profile} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
