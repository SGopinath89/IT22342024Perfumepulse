import "./Category.css";
import Input from "../../../Components/Input/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="checkbox" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="bloombliss"
          title="Bloom_Bliss"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="woodlandwonders"
          title="Woodland_Wonders"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="citruscharms"
          title="Citrus_Charms"
          name="test"
        />
       
      </div>
    </div>
  );
}

export default Category;
