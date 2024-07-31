import classes from './LocDropDown.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import locations from '../../../../Assests/Locations/locations';
import { useState } from 'react';
import LocName from './SelectedLocName/SelectedLocName';
import SuggLocName from './SuggestionsLocName/SuggLocName';

const LocDropDown = (props) => {
  const [locname, setlocname] = useState("Vijayawada");
  const [locationsarr, setlocations] = useState(locations);

  const selectedvalue = (e) => {
    setlocname(e);
    props.setloc(e);
  }

  const locfilter = (e) => {
    let enteredval = e.target.value;
    // props.setLocFilter(enteredval);
    let vallen = enteredval.length;
    let locarr = [];
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].locname.slice(0, vallen).toUpperCase() === enteredval.toUpperCase()) {
        locarr.push(locations[i]);
      }

    }

    setlocations(locarr);
  }



  return (
    <Dropdown onSelect={selectedvalue}>
      <Dropdown.Toggle variant='black'>
        {props.showcity && <LocName locname={locname} styleobj={props.styleobj} />}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <input type='search' className={classes.locsearchbar} placeholder='Search your Location' onChange={locfilter} />
        <Dropdown.Divider />
        {locationsarr.length !== 0 && locationsarr.map((loc => {
          return <Dropdown.Item eventKey={loc.locname}><SuggLocName locname={loc.locname} /></Dropdown.Item>
        }))}

        {locationsarr.length === 0 && <SuggLocName locname="No Results Matched!!!" />}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LocDropDown;