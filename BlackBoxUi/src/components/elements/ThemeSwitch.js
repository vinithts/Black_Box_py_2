import React from "react";

const ThemeSwitch = () => {
  return (
    <div class="toggle toggle--daynight">
      <input type="checkbox" id="toggle--daynight" class="toggle--checkbox" />
      <label class="toggle--btn" for="toggle--daynight">
        <span class="toggle--feature"></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
