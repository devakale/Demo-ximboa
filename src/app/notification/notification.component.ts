import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common_service/login.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  Shownotification: any[] = [];  // All notifications or unread notifications
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 7;
  p: number = 1;
  isUnread: boolean = false;  // Flag to track if unread notifications are being shown

  constructor(private service: LoginService) {}

  ngOnInit(): void {
    // Initially load all notifications
    this.loadNotifications(this.currentPage, this.itemsPerPage);
  }

  // Method to load all notifications
  loadNotifications(page: number, limit: number) {
    this.isUnread = false; // Reset to load all notifications
    this.currentPage = 1;
    this.service.Notification(page, limit).subscribe(result => {
      console.log('Notifications:', result.notifications); 
      this.Shownotification = result.notifications;
      this.totalItems = result.pagination.totalItems;
      this.p = 1; 
    });
  }

  // Method to load unread notifications
  showUnreadNotifications() {
    this.isUnread = true;  // Set the flag to indicate unread notifications are shown
    this.currentPage = 1;  // Reset to the first page when filtering unread notifications
    this.fetchAllUnreadNotifications(this.currentPage, this.itemsPerPage); 
  }

  // Recursive method to fetch all unread notifications
  fetchAllUnreadNotifications(page: number, limit: number) {
    this.service.showunseennotification(page, limit).subscribe(result => {
      if (result.notifications.length > 0) {
        this.Shownotification = result.notifications;  // Set notifications to the fetched unread notifications
        this.totalItems = result.pagination.totalItems; // Update total items for pagination
        this.p = page;
      }
    });
  }

  // Method to mark a notification as seen when clicked
  markNotificationAsSeen(notificationId: string) {
    const notification = this.Shownotification.find(n => n._id === notificationId);
    if (notification) {
      this.service.updateNotificationStatus(notificationId).subscribe(() => {
        notification.isSeen = true; // Update the status locally
        if (this.isUnread) {
          this.fetchAllUnreadNotifications(this.currentPage, this.itemsPerPage); // Refresh unread notifications
        }
      });
    }
  }

  // Event handler for pagination change
  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.isUnread) {
      this.fetchAllUnreadNotifications(this.currentPage, this.itemsPerPage); // Load unread notifications for the current page
    } else {
      this.loadNotifications(this.currentPage, this.itemsPerPage); // Load all notifications
    }
    this.p = page;
  }
}
