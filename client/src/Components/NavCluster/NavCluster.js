import pfp from "./pfpicon.png";
import stylesheet from "./Icon.css";

const NavCluster = () => {
  return (
    <>
      <div class="nav-cluster-container">
        <div class="tabs">
          <input id="leaderboard" type="radio" name="slider" checked>
            leaderboard
          </input>
          <input id="settings" type="radio" name="slider">
            settings
          </input>
          <input id="account" type="radio" name="slider">
            account
          </input>
          <div class="buttons">
            <label for="leaderboard"></label>
            <label for="settings"></label>
            <label for="account"></label>
          </div>
          <div class="content">
            <div class="box leaderboard"></div>
            <div class="box settings"></div>
            <div class="box account"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavCluster;
