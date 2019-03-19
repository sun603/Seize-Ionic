export class LibraryModel {
  private libs = [
    'Archives & Special Collections',
    'Aviation Technology',
    'Black Cultural Center',
    'Hicks Undergraduate',
    'Humanities, Social Science & Education',
    'Mathematical Sciences',
    'Parrish Library of Management & Economics',
    'Veterinary Medical',
    'WALC -- Library of Engineering & Science',
  ];

  getlibs(): any[] {
    return this.libs;
  }
}
