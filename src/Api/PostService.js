import axios from 'axios'
import config from '../config.json'

export default class PostService{

    static async getListTasks(date1, date2, department, userCode, condition){
        const response = await axios.get(config.api+'Tasks', {
            params : {
                date1 : date1,
                date2 : date2,
                dapartment : department,
                userCode : userCode,
                condition : condition
            }
        });
        return response;
    }
    static async getTask(id){
        const response = await axios.get(config.api+'Task/'+id);
        return response;
    }
    static async getListUsers(line){
        const response = await axios.get(config.api+'Users', {
            params : {
                line : line
            }
        });
        return response;
    }
    static async getListDepartments(line){
        const response = await axios.get(config.api+'Departments', {
            params : {
                line : line
            }
        });
        return response;
    }
    static async getListPartners(line){
        const response = await axios.get(config.api+'Partners', {
            params : {
                line : line
            }
        });
        return response;
    }
    static async getListThemes(){
        const response = await axios.get(config.api+'Themes', {});
        return response;
    }
    static async getListConditions(){
        const response = await axios.get(config.api+'Conditions', {});
        return response;
    }
    static async getHistoryTask(id){
        const response = await axios.get(config.api+'History/'+id);
        return response;
    }
    static async getAddHistory(id, line){
        const response = await axios.get(config.api+'History/'+id, {
            params : {
                line : line
            }
        });
        return response;
    }
    static async getCanbanTask(id){
        const response = await axios.get(config.api+'Canban/'+id);
        return response;
    }
    static async SticksOnBoardTask(id){
        const response = await axios.get(config.api+'Sticks/Task/'+id);
        return response;
    }
    static async getCanbanExpress(){
        const response = await axios.get(config.api+'Canban', {});
        return response;
    }
    static async getSticksOnExpress(userCode){
        const response = await axios.get(config.api+'Sticks', {
            params : {
                userCode : userCode
            }
        });
        return response;
    }
    static async getStick(stickId, status, isSeccessful){
        const response = await axios.get(config.api+'Stick', {
            params : {
                stickId : stickId,
                status : status,
                isSeccessful : isSeccessful
            }
        });
        return response;
    }
    static async getReport(date1, date2, userCode, department){
        const response = await axios.get(config.api+'Report', {
            params : {
                date1 : date1,
                date2 : date2,
                userCode : userCode,
                department : department
            }
        });
        return response;
    }
    static async getFavorits(userCode){
        const response = await axios.get(config.api+'Favorits', {
            params : {
                userCode : userCode
            }
        });
        return response;
    }
    static async getAddFavoritTask(userCode, taskId){
        const response = await axios.get(config.api+'Favorit/Task', {
            params : {
                userCode : userCode,
                taskId : taskId
            }
        });
        return response;
    }
    static async getAddFavoritStick(userCode, stickId){
        const response = await axios.get(config.api+'Favorit/Stick', {
            params : {
                userCode : userCode,
                stickId : stickId
            }
        });
        return response;
    }
    static async postSaveTask(task){
        await axios.post(config.api+'Task',task);
    }   
    static async postAddSampleAndSticks(data){
        await axios.post(config.api+'AddSampleAndSticks',data);
    }
    static async postAddStick(data){
        await axios.post(config.api+'Stick',data);
    }   
    

}