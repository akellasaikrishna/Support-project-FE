import { BehaviorSubject } from "rxjs";

class DataSharingService {
  private source = new BehaviorSubject("");
  private socketId = new BehaviorSubject("");
  private userObject = new BehaviorSubject(null);
  getUserName = this.source.asObservable();

  getSocketId = this.socketId.asObservable();

  getUserObject = this.userObject.asObservable();

  setUserName = (data: any) => {
    this.source.next(data);
  };

  setSocketId = (data: any) => {
    this.socketId.next(data);
  };

  setUserObject = (data: any) => {
    this.userObject.next(data);
  };
}

export default new DataSharingService();
