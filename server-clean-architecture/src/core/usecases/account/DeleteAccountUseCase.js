class DeleteAccountUseCase {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(accountId) {
    // Logic để xóa tài khoản
    return await this.accountRepository.delete(accountId);
  }
}

module.exports = DeleteAccountUseCase; 