import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { DoubleBubble } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function CheckboxListSecondary() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    async function getdata() {
      const list = await fetch("http://localhost:2022");
      const finaldata = await list.json();
      setData(finaldata);
      setLoading(false);
    }
    getdata();
  }, []);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  console.log(checked);
  function handledelete() {
    let temp = [];
    for (let i = 0; i < checked.length; i++) {
      temp.push(checked[i].id);
    }
    setData(data.filter((el) => !temp.includes(el.id)));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  }
  return loading ? (
    <div className="loading">
      <DoubleBubble
        text={""}
        bgColor={"tranparent"}
        width={"100px"}
        height={"100px"}
      />
    </div>
  ) : (
    <div>
      <Button variant="outlined" sx={{ margin: "10px" }} onClick={handledelete}>
        Delete
      </Button>
      <Button variant="outlined" sx={{ margin: "10px" }}>
        Add To favorite
      </Button>
      <Button variant="outlined" sx={{ margin: "10px" }}>
        Go To favorite
      </Button>
      {success && (
        <Alert severity="success">
          <AlertTitle>Items Deleted</AlertTitle>
        </Alert>
      )}
      <List dense sx={{ width: "50vw", margin: "auto" }}>
        {data.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={"profile"} src={value.profile} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={value.name}
                  sx={{
                    bgcolor:
                      checked.indexOf(value) !== -1 ? "yellow" : "inherit",
                    letterSpacing: "2em",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
