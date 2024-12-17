const Department = require('../Models/DepartmentModel')

const getAllDepartment = async(req,res)=>{
    try{
        const response = await Department.find({});
        if(!response) return res.status(401).json({message:err.message});
        res.status(200).json(response)
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

const addDepartment = async(req,res)=>{
    try{
        const {department} = req.body;
        const response = await Department.insertMany({department:department});
        if(!response) return res.status(401).json({message:err.message});
        res.status(200).json({
            status:true,
            message:"Added successfully"
        })
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

const getOneDepartment = async(req,res)=>{
    try{
        const {id} = req.params;
        const response = await Department.findOne({ _id: id});
        if(!response) return res.status(401).json({message:err.message});
        res.status(200).json(response);
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

const updateDepartment = async(req,res)=>{
    try{
        const {id} = req.params;
        const {department} = req.body;
        const response = await Department.updateOne(
            { _id: id},      
            { $set: { department: department } }    
         );
        if(!response) return res.status(401).json({message:err.message});
        res.status(200).json({
            status:true,
            message:"updated"
        })
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

const deleteDepartment = async(req,res)=>{
    try{
        const {id} = req.params;
        const response = await Department.deleteOne(
            { _id: id}
         );
        if(!response) return res.status(401).json({message:err.message});
        res.status(200).json({
            status:true,
            message:"deleted"
        })
    }catch(err){
        res.status(401).json({message:err.message})
    }
}
const SearchDepartment = async(req, res) => {
    const { name } = req.query; 
    try {
      if (!name) {
        return res.status(400).json({ message: 'Please provide a search term.' });
      }
      const departments = await Department.find({ department: new RegExp(name, 'i') });
      if (departments.length === 0) {
        return res.status(404).json({ message: 'No Departments found' });
    }
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

module.exports = {addDepartment,deleteDepartment,updateDepartment,getAllDepartment,getOneDepartment,SearchDepartment}