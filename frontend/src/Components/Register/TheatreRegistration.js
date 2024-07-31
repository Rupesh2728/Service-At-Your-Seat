import InputBox from "./InputBox/InputBox";
import InputFields from "./InputBoxesWrapper/InputFields";
import Title from "./Title/Title";

const TheatreRegistration=({register})=>{
  return (
    <>
         <Title title="Account Details"/>
         <InputFields>
            <InputBox label="Email" type="email" placeholder="abcd1234@gmail.com" name="email" register={register} />
            <InputBox label="License Number" type="text" placeholder="Should be of Length 6" name="License_Number" register={register}/>
            <InputBox label="Login password" type="password" placeholder="e.g. Adff4$y78" name="Login_password" register={register}/>
         </InputFields>

          <br/>

          <Title title="Theatre Details"/>
         <InputFields>
           <InputBox label="Theatre Name" type="text" placeholder="Enter Theatre name" name="Theatre_Name" register={register}/>
           <InputBox label="Contact Number" type="text" placeholder="Enter Contact number" name="Contact_Number1" register={register}/>
           <InputBox label="Additional Contact Number" placeholder="Enter Additional Contact number" name="Contact_Number2" register={register}/>
           <InputBox label="Street(With Doorno.)" type="text" placeholder="Enter Street" name="Street" register={register}/>
           <InputBox label="City" type="text" placeholder="Enter city" name="City" register={register}/>
           <InputBox label="State" type="text" placeholder="Enter State" name="State" register={register}/>
           <InputBox label="Pincode" type="text" placeholder="Enter pin code" name="Pincode" register={register}/>
           <InputBox label="Theatre Type" type="select" options={["AC","Non-AC"]} name="TheatreType" register={register}/>
         </InputFields> 

            <br/>

         {/* If not required in future remove this section */}
         <Title title="Identification Details"/>
         <InputFields>
           <InputBox label="NearByPlace-1" type="text" placeholder="Landmark1" name="nearbyplace1" register={register}/>
           <InputBox label="NearByPlace-2" type="text" placeholder="Landmark2" name="nearbyplace2" register={register}/>
           <InputBox label="NearByPlace-3" type="text" placeholder="Landmark3" name="nearbyplace3" register={register}/>
           <InputBox label="NearByPlace-4" type="text" placeholder="Landmark4" name="nearbyplace4" register={register}/>
         </InputFields>
    </>
  );
}

export default TheatreRegistration;