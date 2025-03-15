import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SpaceService } from '../../../services/space.service';
import { Space } from '../../../models/Space';

@Component({
  selector: 'app-space',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,

    FormsModule,
    MatDialogModule
  ],
  templateUrl: './space.component.html',
  styleUrl: './space.component.css'
})
export class SpaceComponent implements OnInit {

  dialog: MatDialog;
  //dataSource: Note[] = [];
  notas: Space[] = [];
  dataSource = new MatTableDataSource<Space>();
  displayedColumns: string[] = ['id', 'type', 'maxCapacity', 'pricePerHour', 'actions'];
  loading = false;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private _spaceService: SpaceService, private injector: Injector, private toast: ToastrService) {
    this.dialog = injector.get(MatDialog);
  }

  ngOnInit(): void {
    this.getSpaces();
  }

  private getSpaces(): void {
    this.loading = true;
    this._spaceService.list().subscribe({
      next: (data: any[]) => {
        this.notas = Space.mapSpacesArray(data);
        console.log(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener spaces:', err);
        this.loading = false;
      },
    });
  }

  // Métodos para las acciones de editar, eliminar, etc.
  viewNote(space: Space): void {
    console.log('Ver Espacio:', space);
    /*const dialogRef = this.dialog.open(CreateComponent, {
      width: '800px',
      data: {
        obj: space
      }
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response !== null && response !== undefined)
        {
          console.log("actualizo");
          this.getNotas();
        }
    });*/
  }
  
}