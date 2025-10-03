import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule,NgClass,RouterLink],
  templateUrl: './sidebar.component.html',
  styles: [`
    .nav-item.active {
      @apply bg-blue-50 text-blue-600 font-semibold;
    }
  `]
})
export class SidebarComponent {
  @Input() isOpen = true;

  // Cấu trúc menu đầy đủ giống như ảnh
  navGroups = [
    {
      title: 'Quản lý người dùng',
      items: [
        { path: '/admin/users-list', name: 'Danh sách người dùng', icon: 'fas fa-users' }
        // { path: '/admin/user-details', name: 'Chi tiết người dùng', icon: 'fas fa-user-edit' },
        // { path: '/admin/roles-permissions', name: 'Vai trò & Quyền hạn', icon: 'fas fa-user-shield' },
      ],
    },
    {
      title: 'Cấu hình hệ thống',
      items: [
        { path: '/admin/system-plans', name: 'Gói & Hạn mức', icon: 'fas fa-layer-group' },
        { path: '/admin/system-integrations', name: 'AI/Email/Thanh toán', icon: 'fas fa-plug' },
        { path: '/admin/system-srs', name: 'SRS & Bảng xếp hạng', icon: 'fas fa-cogs' },
      ],
    },
    {
      title: 'Giám sát & Báo cáo',
      items: [
        { path: '/admin/questions', name: 'Nhật ký kiểm toán', icon: 'fas fa-clipboard-list' },
        { path: '/admin/revenue-reports', name: 'Báo cáo doanh thu', icon: 'fas fa-chart-line' },
      ],
    }
  ];
}