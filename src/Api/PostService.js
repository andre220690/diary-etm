import axios from 'axios'
import config from '../config.json'

export default class PostService{

    static async getListTasks(date1, date2, department, userCode, condition){
        const response = await axios.get(config.api+'ListTasks', {
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
        const response = await axios.get(config.api+'Task', {
            params : {
                TaskId : id
            }
        });
        return response;
    }
    static async getListUsers(line){
        const response = await axios.get(config.api+'ListUsers', {
            params : {
                line : line
            }
        });
        return response;
    }
    static async getListPartners(line){
        const response = await axios.get(config.api+'ListPartners', {
            params : {
                line : line
            }
        });
        return response;
    }
    static async getListThemes(){
        const response = await axios.get(config.api+'ListThemes', {});
        return response;
    }
    static async getListConditions(){
        const response = await axios.get(config.api+'ListConditions', {});
        return response;
    }
    static async getHistoryTask(id){
        const response = await axios.get(config.api+'HistoryTask', {
            params : {
                TaskId : id
            }
        });
        return response;
    }
    static async getAddHistory(id, line){
        const response = await axios.get(config.api+'AddHistoryTask', {
            params : {
                TaskId : id,
                line : line
            }
        });
        return response;
    }
    static async getCanbanTask(id){
        const response = await axios.get(config.api+'CanbanTask', {
            params : {
                TaskId : id
            }
        });
        return response;
    }
    static async getSticksOnBoardTask(id){
        const response = await axios.get(config.api+'SticksOnBoardTask', {
            params : {
                TaskId : id
            }
        });
        return response;
    }
    static async getCanbanExpress(){
        const response = await axios.get(config.api+'CanbanExpress', {});
        return response;
    }
    static async getSticksOnExpress(userCode){
        const response = await axios.get(config.api+'SticksOnExpress', {
            params : {
                userCode : userCode
            }
        });
        return response;
    }
    static async getStickRefrash(stickId, status, isSeccessful){
        const response = await axios.get(config.api+'StickRefrash', {
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
        const response = await axios.get(config.api+'AddFavoritTask', {
            params : {
                userCode : userCode,
                taskId : taskId
            }
        });
        return response;
    }
    static async getAddFavoritStick(userCode, stickId){
        const response = await axios.get(config.api+'AddFavoritStick', {
            params : {
                userCode : userCode,
                stickId : stickId
            }
        });
        return response;
    }
    static async postSaveTask(task){
        await axios.post(config.api+'SaveTask',task);
    }   
    static async postAddSampleAndSticks(data){
        await axios.post(config.api+'AddSampleAndSticks',data);
    }
    static async postAddStick(data){
        await axios.post(config.api+'AddStick',data);
    }   
    

}