const mongoose=require("mongoose");
const {DateTime}=require("luxon");
const Schema=mongoose.Schema;

const AuthorSchema=new Schema({
    first_name:{type: String,required:true,maxLength:100},
    family_name:{type:String,required:true,maxLength:100},
    date_of_birth:{type:Date},
    date_of_death:{type:Date},
});

AuthorSchema.virtual("name").get(function(){
    let fullname="";
    if(this.first_name && this.family_name){
        fullname=`${this.family_name},${this.first_name}`;
    }
    return fullname;
});
AuthorSchema.virtual('birth_date_formatted').get(function(){
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString();
})
AuthorSchema.virtual('death_date_formatted').get(function(){
    return DateTime.fromJSDate(this.date_of_death).toLocaleString();
})
AuthorSchema.virtual("url").get(function(){
    return `/catalog/author/${this._id}`;
});

module.exports=mongoose.model("Author",AuthorSchema);