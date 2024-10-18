import React from "react";
import { Dropdown } from "antd";
import { logout } from "api/actions/auth";
import { connect } from "react-redux";

class UserDropdown extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  render(){
    const items = [
      {
        key: '1',
        label: 'My Account',
        disabled: true,
      },
      {
        type: 'divider',
      },
      {
        key: '2',
        label: 'Profile',
        extra: '⌘P',
      },
      {
        key: '3',
        label: 'Settings',
        extra: '⌘S',
      },
      {
        type: 'divider',
      },
      {
        key: '4',
        label: (
          <div className="w-full">
            <span className="text-red-500">
              Logout
            </span>
            <span 
              className="text-red-500" 
              style={{ float: 'right' }}
            >
              ⌘P
            </span>
          </div>
        ),
        onClick:this.props.logout
      }
    ]


    return (
      <>
        <Dropdown menu={{ items }}>
          <div className="items-center flex">
            <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
              <img
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={"https://shorturl.at/bvtBG"}
              />
            </span>
          </div>
        </Dropdown>
      </>
    );
  }
};

export default connect(null, {logout})(UserDropdown);
