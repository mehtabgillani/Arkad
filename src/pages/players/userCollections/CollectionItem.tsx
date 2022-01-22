import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

interface CategoryItemProps {
  item?: any;
  setCollection?: any;
  setCollectionId?: any;
  loading?:any;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  setCollection,
  setCollectionId,
  loading
}) => {
  const handleCollection = (e) => {
    setCollection(e.target.name);
    setCollectionId(e.target.value);
   
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        defaultValue={item[0].address}
        name="collections"
        onChange={handleCollection}
      
      >
        {loading ? <>
          {item.map((item:any) => {
          return (
            <FormControlLabel
              value={item.address}
              name={item.name}
              control={<Radio />}
              label={<Typography>{item.name}</Typography>}
            />
          );
        })}
        </>:<>
        {item.map((item:any) => {
          return (
            <FormControlLabel
            disabled
              value={item.address}
              name={item.name}
              control={<Radio />}
              label={<Typography>{item.name}</Typography>}
            />
          );
        })}
        </>}
       
      </RadioGroup>
    </FormControl>
  );
};

export default CategoryItem;
