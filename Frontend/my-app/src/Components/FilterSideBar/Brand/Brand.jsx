import "./Brand.css";
import Input from "../../../Components/Input/Input";

function Brand({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Brand</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="checkbox" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="Chanel"
          title="Chanel"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Dior"
          title="Dior"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Gucci"
          title="Gucci"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Calvin Klein"
          title="Calvin_Klein"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Tom Ford"
          title="Tom_Ford"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Dolce & Gabbana"
          title="Dolce_&_Gabbana"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Versace"
          title="Versace"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Marc Jacobs"
          title="Marc_Jacobs"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Viktor & Rolf"
          title="Viktor_&_Rolf"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Jo Malone"
          title="Jo_Malone"
          name="test"
        />
      </div>
    </div>
  );
}

export default Brand;
