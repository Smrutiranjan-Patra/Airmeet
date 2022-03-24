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
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [checked, setChecked] = React.useState([]);
  const [favitem, setFavitem] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    async function getdata() {
      const list = await fetch("https://airmeetbackendpro.herokuapp.com/");
      const finaldata = await list.json();
      setData(finaldata);
      setLoading(false);
    }
    getdata();
  }, []);

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

  const uniqueObject = (arrayOfObjects) => {
    const ids = new Set();
    const results = [];
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (ids.has(arrayOfObjects[i].id)) continue;
      else {
        results.push(arrayOfObjects[i]);
        ids.add(arrayOfObjects[i].id);
      }
    }
    return results;
  };

  function handlefavitem() {
    if (localStorage.getItem("favitem") === null) {
      localStorage.setItem("favitem", JSON.stringify(checked));
    } else {
      const data = JSON.parse(localStorage.getItem("favitem"));
      const temp = [...data, ...checked];
      const newdata = uniqueObject(temp);
      localStorage.clear();
      localStorage.setItem("favitem", JSON.stringify(newdata));
    }

    setChecked([]);
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
      <Button
        variant="outlined"
        sx={{ margin: "10px" }}
        onClick={handlefavitem}
      >
        Add To favorite
      </Button>
      <Button
        variant="outlined"
        sx={{ margin: "10px" }}
        onClick={() => navigate("./favorite")}
      >
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
